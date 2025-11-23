import { Router } from "express";
import prisma from "../prismaClient";

const router = Router();

/**
 * SEED automático se tabela estiver vazia
 */
router.get("/", async (req, res) => {
  try {
    let services = await prisma.service.findMany();

    if (services.length === 0) {
      await prisma.service.createMany({
        data: [
          { name: "Corte de Cabelo", price: 30.0, duration: 30 },
          { name: "Barba", price: 20.0, duration: 20 },
          { name: "Sobrancelha", price: 15.0, duration: 15 }
        ]
      });
      services = await prisma.service.findMany();
    }

    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar serviços" });
  }
});

/**
 * GET por ID
 */
router.get("/:id", async (req, res) => {
  try {
    const service = await prisma.service.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!service) return res.status(404).json({ error: "Serviço não encontrado" });

    res.json(service);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar serviço" });
  }
});

/**
 * Criar serviço
 */
router.post("/", async (req, res) => {
  try {
    const { name, price, duration } = req.body;

    const service = await prisma.service.create({
      data: { name, price, duration },
    });

    res.json(service);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar serviço" });
  }
});

/**
 * Atualizar serviço
 */
router.put("/:id", async (req, res) => {
  try {
    const { name, price, duration } = req.body;

    const service = await prisma.service.update({
      where: { id: Number(req.params.id) },
      data: { name, price, duration }
    });

    res.json(service);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar serviço" });
  }
});

/**
 * Deletar serviço
 */
router.delete("/:id", async (req, res) => {
  try {
    await prisma.service.delete({
      where: { id: Number(req.params.id) }
    });

    res.json({ message: "Serviço deletado" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar serviço" });
  }
});

export default router;
