import { z } from "zod";

export const enquirySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  kind: z.enum(["IN_PERSON", "VIRTUAL"]),
  occasion: z.string().min(1, "Please select an occasion"),
  eventDate: z.string().optional().or(z.literal("")),
  garmentType: z.string().optional(),
  budget: z.string().optional(),
  inspiration: z.string().optional(),
  message: z.string().optional(),
  preferredDates: z.array(z.string().datetime()).optional().default([]),
  timeZone: z.string().min(1, "Time zone is required"),
  consent: z.boolean().refine((v) => v === true, {
    message: "You must consent to the collection of your personal details",
  }),
  referenceImage: z.any().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const virtualFittingSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  measurements: z.record(z.string(), z.string()).default({}),
  notes: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: "You must consent to the storage of your measurements",
  }),
});

export type VirtualFittingInput = z.infer<typeof virtualFittingSchema>;

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1, "Please share your message"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const rentalEnquirySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  rentalId: z.string().optional(),
  eventDate: z.string().optional(),
  message: z.string().optional(),
});

export type RentalEnquiryInput = z.infer<typeof rentalEnquirySchema>;

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export const settingSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
});

export type SettingInput = z.infer<typeof settingSchema>;
