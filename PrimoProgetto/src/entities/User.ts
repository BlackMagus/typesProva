import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post.ts";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "varchar", unique: true })
    email!: string;

    @Column({ type: "boolean", default: false })
    isSubscribed!: boolean;

    @Column({ type: "timestamp", nullable: true })
    subscribedAt!: Date | null;
    
    @OneToMany(() => Post, (post) => post.user)
    posts!: Post[];
}