import "reflect-metadata";
import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source.ts"
import { User } from "./entities/User.ts"
dotenv.config();
import { Post } from "./entities/Post.ts";

async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Database connesso con successo!");

        const userRepository = AppDataSource.getRepository(User);
        const postRepository = AppDataSource.getRepository(Post);

        console.log("\n--- Creazione di un Utente ---");
        const nuovoUtente = userRepository.create({
            name: "Alice Rossi",
            email: "alice@example.com",
            password: "password123",
        });
        const utenteSalvato = await userRepository.save(nuovoUtente);
        console.log("Utente salvato:", utenteSalvato);

        console.log("\n--- Creazione dei Post ---");
        const post1 = postRepository.create({
            title: "Imparare TypeORM",
            content: "TypeORM semplifica la gestione del database...",
            user: utenteSalvato 
        });

        const post2 = postRepository.create({
            title: "Postgres è fantastico",
            content: "Soprattutto quando usato con TypeScript.",
            user: utenteSalvato
        });

        await postRepository.save([post1, post2]);
        console.log("Post salvati nel database.");

        console.log("\n--- Lettura Utente con i suoi Post ---");
        const utenteConPost = await userRepository.findOne({
            where: { email: "alice@example.com" },
            relations: { posts: true } 
        });

        console.log("Risultato finale:", JSON.stringify(utenteConPost, null, 2));

    } catch (error) {
        console.error("Errore durante l'esecuzione:", error);
    } finally {
        await AppDataSource.destroy();
        console.log("Connessione chiusa.");
    }
}

main();