import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid } from "uuid";

// Entity da table 'surveys' para o TypeORM
// Será essa Class utilizada para receber e salvar os registros no banco de dados
@Entity("surveys")
class Survey {
    
    @PrimaryColumn()
    readonly id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Survey };