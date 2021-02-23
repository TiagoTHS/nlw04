import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid } from "uuid";

// 'Table' User para o TypeORM
// Será essa 'Entity' utilizada para receber e salvar os registros no banco de dados
@Entity("users")
class User {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { User };