// pages/api/send-email.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import BillingFailureEmail from "../../emails/BillingFailureEmail";

const resend = new Resend("re_YM3jNEQA_8FR9NqL5h4EKyKwRkiG32vBd");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { to, customerName } = req.body;

  if (!to || !customerName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject: "Billing Failure Notification",
      react: <BillingFailureEmail customerName={customerName} />,
    });

    if (error) {
      throw error;
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
