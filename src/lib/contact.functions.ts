import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10, "Please add a little more detail").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const id = crypto.randomUUID();
    const apiKey = process.env["SUPABASE_PUBLISHABLE_KEY"]!;

    const response = await fetch(
      `${process.env["SUPABASE_URL"]}/rest/v1/contact_submissions`,
      {
        method: "POST",
        headers: {
          apikey: apiKey,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          id,
          full_name: data.fullName,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      },
    );

    if (!response.ok) {
      console.error("contact insert failed", response.status, await response.text());
      throw new Error("We couldn't record your inquiry. Please try again.");
    }


    const { notifyInquiry } = await import("./contact-notify.server");
    await notifyInquiry({ id, ...data });

    return { ok: true as const, id };
  });

