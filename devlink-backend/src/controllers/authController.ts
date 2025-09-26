import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { users, type User } from "../models/userModel.ts";

const SECRET = "devlink_secret";

export const register = (req: Request, res: Response) => {
  const { firstName, email, password, confirmPassword } = req.body;

  if (!firstName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Preencha todos os campos" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "As senhas não coincidem" });
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: "E-mail já registrado" });
  }

  const newUser: User = {
    id: (users.length + 1).toString(),
    firstName: firstName,
    email,
    password,
    confirmPassword
  };

  users.push(newUser);

  return res.status(201).json({
    message: "Usuário registrado com sucesso!",
    user: { id: newUser.id, firstName: newUser.firstName, email: newUser.email },
  });
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Preencha todos os campos" });
  }

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "E-mail ou senha inválidos" });
  }

  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' });

  return res.json({ token, user: { id: user.id} });
};
