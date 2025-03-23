import { Request, Response } from 'express';
import prisma from '../db'; 
import { addSlotSchema } from '../zod/slot';

export const addSlot = async (req: Request, res: Response) => {
  try {
    const validatedData = addSlotSchema.parse(req.body); 
    
    let doctor = await prisma.doctor.findUnique({
      where: { name: validatedData.doctorName },
    });
    
    if (!doctor) {
      doctor = await prisma.doctor.create({
        data: { name: validatedData.doctorName },
      });
    }
    
    const slotData = validatedData.slots.map((slotDate: string) => ({
      date: new Date(slotDate),
      doctorId: doctor.id,
    }));

    await prisma.slot.createMany({ data: slotData });
    res.status(201).json({ message: 'Slots added successfully.' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
};

export const getSlot = async (req: Request, res: Response) => {
  try {
    const doctors = await prisma.doctor.findMany({
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
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving slots.' });
  }
};