import "reflect-metadata"
import "dotenv/config";
import { DataSource } from "typeorm"
import { User } from "./entities/User.ts"
import { Post } from "./entities/Post.ts"
import { Profilo } from "./entities/Profilo.ts"
import { Tag } from "./entities/Tag.ts"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [User, Post, Profilo, Tag],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: [],
});
