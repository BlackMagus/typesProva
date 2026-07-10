import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User.ts";

@Entity("posts")
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    title!: string;

    @Column({ type: "text" })
    content!: string;

    // Relazione molti a uno: molti post appartengono a un utente
    @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
    user!: User;
}