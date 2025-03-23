"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSlot = exports.addSlot = void 0;
const db_1 = __importDefault(require("../db"));
const slot_1 = require("../zod/slot");
const addSlot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = slot_1.addSlotSchema.parse(req.body);
        let doctor = yield db_1.default.doctor.findUnique({
            where: { name: validatedData.doctorName },
        });
        if (!doctor) {
            doctor = yield db_1.default.doctor.create({
                data: { name: validatedData.doctorName },
            });
        }
        const slotData = validatedData.slots.map((slotDate) => ({
            date: new Date(slotDate),
            doctorId: doctor.id,
        }));
        yield db_1.default.slot.createMany({ data: slotData });
        res.status(201).json({ message: 'Slots added successfully.' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    }
});
exports.addSlot = addSlot;
const getSlot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield db_1.default.doctor.findMany({
            include: { slots: true },
        });
        if (doctors.length === 0) {
            return res.status(404).json({ error: 'No doctors found.' });
        }
        const result = doctors.map((doctor) => ({
            doctorName: doctor.name,
            slots: doctor.slots.map((slot) => ({
                id: slot.id,
                date: slot.date.toISOString().split('T')[0],
            })),
        }));
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving slots.' });
    }
});
exports.getSlot = getSlot;
