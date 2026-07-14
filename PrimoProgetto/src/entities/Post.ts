import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, DeleteDateColumn } from "typeorm";
import { User } from "./User.ts";
import { Tag } from "./Tag.ts";

@Entity("posts")
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    title!: string;

    @Column({ type: "text" })
    content!: string;

    @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
    user!: User;
    
    @DeleteDateColumn()
    deletedAt!: Date;
        
    @ManyToMany(() => Tag, (tag) => tag.posts, { cascade: true })
    @JoinTable()
    tags!: Tag[];
}