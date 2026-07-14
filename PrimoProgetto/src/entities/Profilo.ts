import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToOne, DeleteDateColumn, JoinColumn } from "typeorm";
import { User } from "./User.ts";

@Entity()
export class Profilo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", nullable: true })
    bio!: string;

    @Column({ type: "varchar", nullable: true })
    avatarUrl!: string;

    @DeleteDateColumn()
    deletedAt!: Date;
    
    @OneToOne(() => User, (user) => user.profilo, { onDelete: "CASCADE" })
    @JoinColumn()
    user!: User;
}
