import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
  const payload = (await request.json()) as InquiryPayload;

  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  // TODO: Connect this to Resend
  // TODO: Add RESEND_API_KEY environment variable
  // TODO: Send inquiry to hello@ckworks.co
  // TODO: Optionally send confirmation email to the user
  //
  // Suggested subject: New CK Works inquiry from {name}
  // Suggested body fields:
  // Name, Email, Business / project, Project type, Timeline, Budget, Message,
  // Submitted from.

  console.info("Project inquiry placeholder received", {
    name: payload.name,
    email: payload.email,
    businessName: payload.businessName,
    projectType: payload.projectType,
    timeline: payload.timeline,
    budget: payload.budget,
    submittedAt: payload.submittedAt,
    sourcePage: payload.sourcePage,
    source: payload.source,
  });

  return NextResponse.json({ ok: true });
}
