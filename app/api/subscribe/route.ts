import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Your Resend Audience ID — set this after creating an audience at resend.com/audiences
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? "";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Add to audience (only if audience ID is set and plan supports it)
    if (AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email,
          audienceId: AUDIENCE_ID,
          unsubscribed: false,
        });
      } catch {
        // Audience API may not be available on free plan — continue anyway
      }
    }

    // Send welcome email
    await resend.emails.send({
      from: "APIVault <hello@apivault.directory>",
      to: email,
      subject: "You're on the list — APIVault",
      html: `
        <div style="font-family:monospace;background:#0A0B0D;color:#e5e7eb;padding:40px;max-width:560px;margin:0 auto;border-radius:12px;border:1px solid #1f2937">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:32px">
            <div style="font-size:22px;font-weight:700;color:#ffffff">API<span style="color:#00FF88">Vault</span></div>
          </div>
          <h1 style="font-size:24px;font-weight:700;color:#ffffff;margin:0 0 12px">You're on the list ✓</h1>
          <p style="color:#9ca3af;line-height:1.6;margin:0 0 24px">
            We'll send you a weekly digest of new free AI APIs, free tier changes, and notable launches.
            No spam, one email per week max.
          </p>
          <div style="background:#111827;border:1px solid #1f2937;border-radius:8px;padding:20px;margin-bottom:28px">
            <p style="color:#6b7280;font-size:13px;margin:0 0 8px">What to expect:</p>
            <ul style="color:#d1d5db;font-size:14px;line-height:1.8;margin:0;padding-left:18px">
              <li>New free AI APIs added to the directory</li>
              <li>Free tier limit changes (increases & cuts)</li>
              <li>Notable model launches with free access</li>
            </ul>
          </div>
          <a href="https://www.apivault.directory/providers" style="display:inline-block;background:#00FF88;color:#0A0B0D;font-weight:700;font-size:14px;padding:12px 24px;border-radius:6px;text-decoration:none">
            Browse APIs now →
          </a>
          <p style="color:#4b5563;font-size:12px;margin-top:32px;border-top:1px solid #1f2937;padding-top:16px">
            You subscribed at apivault.directory · <a href="https://www.apivault.directory" style="color:#6b7280">Unsubscribe</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
