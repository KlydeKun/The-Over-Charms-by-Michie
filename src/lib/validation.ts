import { z } from "zod";

export type FormErrors = Partial<
  Record<keyof z.infer<typeof checkoutSchema>, string>
>;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const checkoutSchema = z.object({
  fulfillment: z.enum(["delivery", "pickup"]),
  name: z.string({ message: "Name is required" }).trim().min(2).max(80),
  phone: z.string({ message: "Phone is required" }).trim().min(7).max(20),
  email: z
    .string({ message: "Email is required" })
    .trim()
    .regex(emailRegex, { message: "Valid email required" })
    .max(160),
  address: z.string().trim().max(200).optional().or(z.literal("")),
  instructions: z.string().trim().max(200).optional().or(z.literal("")),
  date: z
    .string({ message: "Date is required" })
    .min(1)
    .refine(
      (val) => {
        const selected = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected >= today;
      },
      { message: "Date cannot be before today" }
    ),
  time: z.string({ message: "Time is required" }).min(1),
  payment: z.enum(["cod", "card", "gcash", "maya"]),
});
