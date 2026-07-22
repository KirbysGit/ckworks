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
  const projectDetails = [
    ["Project type", inquiry.projectType],
    ["Timeline", inquiry.timeline],
    ["Budget", inquiry.budget],
  ];
  const contactDetails = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Business / project", inquiry.businessName],
    ["Submitted from", inquiry.sourcePage],
    ["Source", inquiry.source],
    ["Submitted at", formatSubmittedAt(inquiry.submittedAt)],
  ];

  return `
    <div style="margin:0;background:#f3efe5;padding:36px 18px;font-family:Inter,Arial,sans-serif;color:#1f2420;">
      <div style="max-width:680px;margin:0 auto;">
        <div style="height:10px;background:#2f5b3f;border:1px solid #274b36;border-bottom:0;border-radius:18px 18px 0 0;"></div>
        <div style="background:#fffdf8;border:1px solid #d8cdbd;border-top:0;border-radius:0 0 18px 18px;box-shadow:0 22px 42px rgba(31,36,32,0.12);overflow:hidden;">
          <div style="padding:30px 32px 24px;background:#fffaf0;border-bottom:1px solid #e6ddce;">
            <p style="margin:0 0 10px;text-transform:uppercase;letter-spacing:0.18em;font-size:11px;color:#2f5b3f;font-weight:800;">
              CK Works Inquiry
            </p>
            <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:1.12;font-weight:500;color:#1f2420;">
              New note from ${escapeHtml(inquiry.name)}
            </h1>
            <p style="margin:14px 0 0;font-size:15px;line-height:1.65;color:#5f665f;">
              A project inquiry came through from the CK Works site.
            </p>
          </div>

          <div style="padding:26px 32px 30px;">
            <div style="background:#f7f3ea;border:1px solid #ded4c5;border-radius:14px;padding:20px 22px;margin-bottom:22px;">
              <p style="margin:0 0 8px;text-transform:uppercase;letter-spacing:0.14em;font-size:11px;color:#2f5b3f;font-weight:800;">
                Message
              </p>
              <p style="margin:0;white-space:pre-line;font-family:Georgia,'Times New Roman',serif;font-size:21px;line-height:1.55;color:#1f2420;">
                ${escapeHtml(inquiry.message)}
              </p>
            </div>

            <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0 12px;margin:0 0 20px;">
              <tbody>
                <tr>
                  ${projectDetails
                    .map(
                      ([label, value]) => `
                        <td style="width:33.333%;vertical-align:top;padding:0 8px 0 0;">
                          <div style="min-height:76px;border:1px solid #ded4c5;background:#fffaf0;border-radius:12px;padding:14px;">
                            <p style="margin:0 0 8px;text-transform:uppercase;letter-spacing:0.12em;font-size:10px;color:#5f665f;font-weight:800;">
                              ${escapeHtml(label)}
                            </p>
                            <p style="margin:0;font-size:15px;line-height:1.35;color:#1f2420;font-weight:700;">
                              ${escapeHtml(value)}
                            </p>
                          </div>
                        </td>
                      `,
                    )
                    .join("")}
                </tr>
              </tbody>
            </table>

            <table role="presentation" style="width:100%;border-collapse:collapse;margin:0 0 24px;">
              <tbody>
                ${contactDetails
                  .map(
                    ([label, value]) => `
                      <tr>
                        <td style="width:38%;padding:11px 12px;border-top:1px solid #eee6d8;font-size:12px;color:#5f665f;font-weight:800;">
                          ${escapeHtml(label)}
                        </td>
                        <td style="padding:11px 12px;border-top:1px solid #eee6d8;font-size:14px;color:#1f2420;">
                          ${escapeHtml(value)}
                        </td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>

            <a href="mailto:${escapeHtml(
              inquiry.email,
            )}" style="display:block;text-align:center;background:#2f5b3f;color:#fffdf8;text-decoration:none;border-radius:12px;padding:14px 20px;font-size:14px;font-weight:800;">
              Reply to ${escapeHtml(inquiry.name)}
            </a>

            <p style="margin:18px 0 0;text-align:center;font-size:12px;line-height:1.6;color:#7a8078;">
              Sent from ${escapeHtml(inquiry.sourcePage)} via ${escapeHtml(
                inquiry.source,
              )}. Replying to this email will go to ${escapeHtml(
                inquiry.email,
              )}.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function formatSubmittedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/New_York",
  }).format(date);
}
