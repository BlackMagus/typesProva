import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, DeleteDateColumn, BeforeInsert } from "typeorm";
import { Post } from "./Post.ts";
import { Profilo } from "./Profilo.ts";
import bcrypt from "bcrypt"; 

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "varchar", unique: true })
    email!: string;

    @Column({ type: "varchar" })
    password!: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
}
    @Column({ type: "boolean", default: false })
    isSubscribed!: boolean;

    @Column({ type: "timestamp", nullable: true })
    subscribedAt!: Date | null;
    
    @DeleteDateColumn()
    deletedAt!: Date;
    
    @OneToMany(() => Post, (post) => post.user)
    posts!: Post[];

    @OneToOne(() => Profilo, (profilo) => profilo.user, { cascade: true })
    profilo!: Profilo;
}
