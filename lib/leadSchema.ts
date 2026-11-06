import { z } from "zod";

export const leadFormSchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().min(1).max(160),
  contact: z.string().trim().min(3).max(160),
  companySize: z.string().trim().min(1).max(80),
  consent: z.literal(true),
  /** Honeypot — bots fill this; humans leave empty. */
  website: z.string().max(200).optional().default(""),
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;

export const leadApiSchema = leadFormSchema;