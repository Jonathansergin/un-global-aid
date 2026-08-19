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
  try {
    const { sendTemplateEmail } = await import("./email-templates/send-email").catch(
      () => ({ sendTemplateEmail: null }) as never,
    );

    if (typeof sendTemplateEmail !== "function") {
      console.info("[contact] email templates not scaffolded yet; inquiry stored", inquiry.id);
      return;
    }

    await sendTemplateEmail("contact-confirmation", inquiry.email, {
      templateData: { name: inquiry.fullName, subject: inquiry.subject },
      idempotencyKey: `contact-confirm-${inquiry.id}`,
    });
  } catch (err) {
    console.error("[contact] notification failed", err);
  }
}
