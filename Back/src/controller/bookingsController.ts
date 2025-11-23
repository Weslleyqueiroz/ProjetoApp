import { Request, Response } from "express";
import prisma from "../prismaClient";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId, serviceId, date } = req.body;

    if (!userId || !serviceId || !date)
      return res.status(400).json({ error: "Campos faltando" });

    const dt = new Date(date);

    const booking = await prisma.booking.create({
      data: {
        userId: Number(userId),
        serviceId: Number(serviceId),
        date: dt,
      },
      include: { user: true, service: true },
    });

    return res.json(booking);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao criar agendamento" });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;

    if (!userId) return res.status(400).json({ error: "userId ausente" });

    const list = await prisma.booking.findMany({
      where: { userId: Number(userId) },
      include: { service: true },
    });

    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao buscar agendamentos" });
  }
};
