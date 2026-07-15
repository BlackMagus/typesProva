import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, DeleteDateColumn, BeforeInsert } from "typeorm";
import bcrypt from "bcrypt"; 

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 100 })
    username!: string;

    @Column({ type: "varchar", unique: true })
    email!: string;

    @Column({ type: "varchar" })
    password!: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

}