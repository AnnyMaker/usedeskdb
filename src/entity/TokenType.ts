import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {Token} from "./Token";


@Entity('token_type')
export class TokenType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string

    @OneToMany( () => Token, recipient => recipient.token_type)
    tokens: Token[]
}