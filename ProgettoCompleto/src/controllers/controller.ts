import { Request, Response } from "express";
import { AppDataSource } from "../dataConfig/data-source.ts";
import { User } from "../entities/User.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_fallback_secret";

export const register = async (req: Request, res: Response): Promise<any> => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) return res.status(400).json({ message: "Campi obbligatori." });
    if (password.length < 8) return res.status(400).json({ message: "Password troppo corta (min 8 caratteri)." });

    try {

        const userRepository = AppDataSource.getRepository(User);
        const existingUser = await userRepository.findOne({ where: [{ email }, { username }] });
        if (existingUser) return res.status(400).json({ message: "Username o Email già occupati." });

        const newUser = userRepository.create({ username, email, password });
        await userRepository.save(newUser);

        return res.status(201).json({ message: "Utente registrato!" });
    } catch (error) {
        return res.status(500).json({ message: "Errore nel server." });
    }
};

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Credenziali errate." });
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
        return res.json({ message: "Login effettuato", token });
    } catch (error) {
        return res.status(500).json({ message: "Errore nel server." });
    }
};