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
          <Text>We attempted to process your payment, but unfortunately, it failed.</Text>
          <Text>Please update your payment details as soon as possible to avoid service interruptions.</Text>
          <Text>Best,</Text>
          <Text>The Billing Team</Text>
        </Container>
      </Body>
    </Html>
  );
}
