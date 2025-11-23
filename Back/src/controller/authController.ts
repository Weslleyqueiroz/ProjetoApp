import { Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!email || !password || !name)
      return res.status(400).json({ error: "Campos faltando" });

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ error: "Email já cadastrado" });

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, 
        email,
         password: hash, 
         role: role || "client" },
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "dev",
      { expiresIn: "1d" }
    );

    return res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
   console.error("ERRO CRÍTICO NO REGISTRO DO PRISMA:", JSON.stringify(err, null, 2)); 
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Campos faltando" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Senha inválida" });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "dev",
      { expiresIn: "1d" }
    );

    return res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};
