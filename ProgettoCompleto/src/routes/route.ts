import { Router } from "express";
import { register, login } from "../controllers/controller.ts";
import { authenticateToken, AuthRequest } from "../middlewares/middleware.ts";
import { Response } from "express";

const router = Router();

// Rotte Pubbliche
router.post("/register", register);
router.post("/login", login);

// Rotta Protetta
router.get("/dashboard", authenticateToken, (req: AuthRequest, res: Response) => {
    res.json({ message: `Benvenuto nella dashboard protetta, ${req.user?.username}!` });
});

export default router;