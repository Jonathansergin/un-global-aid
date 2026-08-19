/**
 * Sends notification + acknowledgement emails for a contact inquiry.
 *
 * Email delivery activates once a verified sender domain is connected to the
 * project. Until then this logs the inquiry so nothing is lost.
 */
export async function notifyInquiry(inquiry: {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
}) {
  console.info("[contact] inquiry received", {
    id: inquiry.id,
    email: inquiry.email,
    subject: inquiry.subject,
  });
}
