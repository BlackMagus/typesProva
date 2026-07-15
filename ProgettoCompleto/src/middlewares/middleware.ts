import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_fallback_secret";

export interface AuthRequest extends Request {
    user?: { userId: string; username: string };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): any => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Accesso negato. Token mancante." });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token non valido o scaduto." });
        req.user = decoded as { userId: string; username: string };
        next();
    });
};