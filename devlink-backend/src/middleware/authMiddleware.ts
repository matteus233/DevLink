/* eslint-disable @typescript-eslint/no-namespace */
import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

const SECRET = "devlink_secret";

interface TokenPayload extends JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload; // ✅ mais semântico
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Formato do token inválido" });
  }

  try {
    const decoded = jwt.verify(token, SECRET) as TokenPayload;

    req.user = decoded; // ✅ agora você acessa req.user.id nas rotas

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado",error });
  }
};
