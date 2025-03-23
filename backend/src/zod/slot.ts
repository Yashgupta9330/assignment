import { z } from "zod";

const isFutureOrToday = (dateString: string) => {
  const today = new Date();
  const date = new Date(dateString);
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  return date >= today;
};

export const addSlotSchema = z.object({
  doctorName: z.string().min(1, { message: "Doctor name is required" }),
  slots: z.array(
    z.string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format, expected YYYY-MM-DD" })
      .refine(isFutureOrToday, { message: "Slot date must be today or in the future" })
  )
});
