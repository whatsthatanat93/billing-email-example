# Billing Failure Email Example (Next.js + React Email + Resend)

## Overview
This project demonstrates how to send a billing failure email using **Next.js**, **React Email**, and **Resend**.

Oh hello there! *wave* 

Here is how you can set up a billing failure email all on your own with some helpful programming tools! 

## Prerequisites 
We'll be using using React Email and Resend. 

First, get your handy source-code editor up and the latest version of node.js downloaded, we recommend v22.13.1. I'm using VS Code, but you can use Terminal or Sublime, whatever suits your fancy.

## Setup 
Next, create a new Next.js project. Here's an example project name "billing-email-example": 

```
npx create-next-app@latest billing-email-example
cd billing-email-example
```

Install the following dependencies: 

```
npm install @react-email/components @react-email/html resend
```

Next, implement a new email template. Inside of your project, create this new folder:
```
mkdir emails && touch emails/BillingFailureEmail.tsx
```
We have 3 required strings you should include in your email: the From, To, and Subject of the email. Verifing the From domain in Resend is essential for sending. 

Now, define the email template in emails/BillingFailureEmail.tsx:

```javascript
// emails/BillingFailureEmail.tsx
import { Html, Head, Preview, Body, Container, Text } from "@react-email/components";

export default function BillingFailureEmail({ customerName }: { customerName: string }) {
  return (
    <Html>
      <Head />
      <Preview>Billing Failure Notice</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <Container>
          <Text>Dear {customerName},</Text>
          <Text>We attempted to process your payment, but unfortunately, payment failed.</Text>
          <Text>Please update your payment details as soon as possible to avoid service interruptions.</Text>
          <Text>Best,</Text>
          <Text>Stripe Billing Team</Text>
        </Container>
      </Body>
    </Html>
  );
}
```

Next, create a new API route in ```pages/api/send-email.tsx```: 

```javascript
// pages/api/send-email.tsx
import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import BillingFailureEmail from "../../emails/BillingFailureEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

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
      from: "billing@yourdomain.com",
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
```

Follow these steps to start the server: 

1. Install dependencies: ```npm install```

You will want to create an API Key in Resend ideally, if you'd like this billing failure email to appear in the Resend inbox UI. We have helpful steps on how to do that here: https://resend.com/onboarding

Create a .env.local file in the root of your project and add your Resend API Key.  

2. ```RESEND_API_KEY=your_resend_api_key_here```

3. Start the dev server: ```npm run dev```

4. Test sending an email by starting your Next.js server and using a tool like Postman or curl to send a POST request with the following JSON body: 

```javascript
curl -X POST http://localhost:3000/api/send-email \
     -H "Content-Type: application/json" \
     -d '{ "to": "recipient@example.com", "customerName": "John Doe" }'
```

And voila! The following Github repo is avaiable for review! 
