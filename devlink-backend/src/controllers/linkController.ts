import type { Request, Response } from "express";
import { createLink, getLinksByUserId, deleteLink } from "../models/linkModel.ts";

export const addLink = (req: Request, res: Response) => {
  const { title, url } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  if (!title || !url) {
    return res.status(400).json({ message: "Título e URL são obrigatórios" });
  }

  const newLink = createLink({ id: userId, title, url });
  res.status(201).json(newLink);
};

export const listLinks = (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  const userLinks = getLinksByUserId(String(userId));
  res.json(userLinks);
};

export const removeLink = (req: Request, res: Response) => {
  const userId = req.user?.id;
  const linkId = Number(req.params.id);

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  const success = deleteLink(String(linkId), userId);
  if (success) {
    res.json({ message: "Link removido com sucesso" });
  } else {
    res.status(404).json({ message: "Link não encontrado" });
  }
};
