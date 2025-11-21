import { Request, Response } from "express";
import prisma from "../prismaClient";

export const getServices = async (req: Request, res: Response) => {
  try {
    const list = await prisma.service.findMany();

    if (list.length === 0) {
      await prisma.service.createMany({
        data: [
          { name: "Corte de Cabelo", price: 30.0, duration: 30 },
          { name: "Barba", price: 20.0, duration: 20 },
          { name: "Sobrancelha", price: 15.0, duration: 15 },
        ],
      });

      const again = await prisma.service.findMany();
      return res.json(again);
    }

    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao buscar serviços" });
  }
};
