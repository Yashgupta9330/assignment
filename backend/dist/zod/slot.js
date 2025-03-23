"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSlotSchema = void 0;
const zod_1 = require("zod");
const isFutureOrToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date >= today;
};
exports.addSlotSchema = zod_1.z.object({
    doctorName: zod_1.z.string().min(1, { message: "Doctor name is required" }),
    slots: zod_1.z.array(zod_1.z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format, expected YYYY-MM-DD" })
        .refine(isFutureOrToday, { message: "Slot date must be today or in the future" }))
});
