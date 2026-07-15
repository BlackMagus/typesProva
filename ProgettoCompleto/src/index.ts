import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./dataConfig/data-source.ts";
import authRoutes from "./routes/route.ts";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes); 

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("PostgreSQL connesso correttamente!");
        app.listen(PORT, () => console.log(`Server attivo sulla porta ${PORT}`));
    })
    .catch((error) => console.error("Errore avvio DB:", error));