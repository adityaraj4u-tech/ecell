import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  /** Honeypot — must stay empty */
  website: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const eventRegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  branch: z.string().min(2, "Branch is required"),
  year: z.enum(["1", "2", "3", "4"], {
    required_error: "Select your year",
  }),
  rollNumber: z
    .string()
    .min(3, "Roll number is required")
    .max(32, "Roll number is too long"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  eventId: z.string().min(1),
  eventTitle: z.string().min(1),
  /** Honeypot */
  website: z.string().max(0).optional(),
});

export type EventRegisterValues = z.infer<typeof eventRegisterSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  /** Honeypot */
  website: z.string().max(0).optional(),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
