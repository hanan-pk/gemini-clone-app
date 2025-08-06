import { z } from "zod";

export const phoneSchema = z.object({
  countryCode: z.string().min(1, "Country code required"),
  phone: z
    .string()
    .min(7, "Phone must be at least 7 digits")
    .regex(/^[0-9]+$/, "Only numbers allowed"),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^[0-9]+$/, "Only numbers allowed"),
});
