import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { contactEmail } from "@/lib/data";

type InquiryPayload = {
  name?: string;
  email?: string;
  businessName?: string;
  projectType?: string;
  timeline?: string;
  budget?: string;
  message?: string;
  submittedAt?: string;
  sourcePage?: string;
  source?: string;
};

type NormalizedInquiry = Required<InquiryPayload>;

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: InquiryPayload;

  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid inquiry payload." },
      { status: 400 },
    );
  }

  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(payload.email)) {
    return NextResponse.json(
      { error: "Please use a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.CKWORKS_INQUIRY_FROM_EMAIL ?? process.env.RESEND_FROM_EMAIL;
  const to = parseEmailList(
    process.env.CKWORKS_INQUIRY_TO_EMAIL ??
      process.env.INQUIRY_TO_EMAIL ??
      contactEmail,
  );
  const cc = parseEmailList(process.env.CKWORKS_INQUIRY_CC_EMAIL);
  const bcc = parseEmailList(process.env.CKWORKS_INQUIRY_BCC_EMAIL);

  if (!apiKey || !from || to.length === 0) {
    console.error("Resend inquiry email is not configured.", {
      hasApiKey: Boolean(apiKey),
      hasFrom: Boolean(from),
      toCount: to.length,
    });

    return NextResponse.json(
      { error: "Email is not configured." },
      { status: 500 },
    );
  }

  const inquiry = normalizeInquiry(payload);
  const subject = `New CK Works inquiry from ${inquiry.name}`;
  const resendPayload = {
    from,
    to,
    ...(cc.length > 0 ? { cc } : {}),
    ...(bcc.length > 0 ? { bcc } : {}),
    reply_to: inquiry.email,
    subject,
    html: buildInquiryHtml(inquiry),
    text: buildInquiryText(inquiry),
    tags: [
      { name: "category", value: "project_inquiry" },
      { name: "source", value: toTagValue(inquiry.source || "site") },
    ],
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": randomUUID(),
      "User-Agent": "ckworks-site/1.0",
    },
    body: JSON.stringify(resendPayload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Resend inquiry email failed.", {
      status: response.status,
      body: errorBody,
    });

    return NextResponse.json(
      { error: "Inquiry email failed to send." },
      { status: 502 },
    );
  }

  const data = (await response.json()) as { id?: string };
  return NextResponse.json({ ok: true, id: data.id });
}

function normalizeInquiry(payload: InquiryPayload): NormalizedInquiry {
  return {
    name: clean(payload.name),
    email: clean(payload.email),
    businessName: clean(payload.businessName) || "Not provided",
    projectType: clean(payload.projectType) || "Not provided",
    timeline: clean(payload.timeline) || "Not provided",
    budget: clean(payload.budget) || "Not provided",
    message: clean(payload.message),
    submittedAt: clean(payload.submittedAt) || new Date().toISOString(),
    sourcePage: clean(payload.sourcePage) || "Not provided",
    source: clean(payload.source) || "site",
  };
}

function clean(value?: string) {
  return value?.trim() ?? "";
}

function parseEmailList(value?: string) {
  return (value ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function isValidEmail(value?: string) {
  return Boolean(value && /^\S+@\S+\.\S+$/.test(value));
}

function toTagValue(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 256) || "site";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildInquiryText(inquiry: NormalizedInquiry) {
  return [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Business / project: ${inquiry.businessName}`,
    `Project type: ${inquiry.projectType}`,
    `Timeline: ${inquiry.timeline}`,
    `Budget: ${inquiry.budget}`,
    `Submitted from: ${inquiry.sourcePage}`,
    `Source: ${inquiry.source}`,
    `Submitted at: ${inquiry.submittedAt}`,
    "",
    "Message:",
    inquiry.message,
  ].join("\n");
}

function buildInquiryHtml(inquiry: NormalizedInquiry) {
  const rows = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Business / project", inquiry.businessName],
    ["Project type", inquiry.projectType],
    ["Timeline", inquiry.timeline],
    ["Budget", inquiry.budget],
    ["Submitted from", inquiry.sourcePage],
    ["Source", inquiry.source],
    ["Submitted at", inquiry.submittedAt],
  ];

  return `
    <div style="background:#faf7f0;padding:32px;font-family:Inter,Arial,sans-serif;color:#1f2420;">
      <div style="max-width:640px;margin:0 auto;background:#fffdf8;border:1px solid #ddd6c8;padding:28px;">
        <p style="margin:0 0 8px;text-transform:uppercase;letter-spacing:0.16em;font-size:12px;color:#2f5b3f;font-weight:700;">
          CK Works Inquiry
        </p>
        <h1 style="margin:0 0 22px;font-family:Georgia,serif;font-size:32px;font-weight:500;color:#1f2420;">
          New project inquiry from ${escapeHtml(inquiry.name)}
        </h1>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <tbody>
            ${rows
              .map(
                ([label, value]) => `
                  <tr>
                    <td style="width:38%;padding:10px 12px;border-top:1px solid #eee6d8;font-size:13px;color:#5f665f;font-weight:700;">
                      ${escapeHtml(label)}
                    </td>
                    <td style="padding:10px 12px;border-top:1px solid #eee6d8;font-size:14px;color:#1f2420;">
                      ${escapeHtml(value)}
                    </td>
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
        <div style="border-top:1px solid #ddd6c8;padding-top:20px;">
          <p style="margin:0 0 8px;font-size:13px;color:#5f665f;font-weight:700;">Message</p>
          <p style="margin:0;white-space:pre-line;font-size:15px;line-height:1.7;color:#1f2420;">${escapeHtml(
            inquiry.message,
          )}</p>
        </div>
      </div>
    </div>
  `;
}
