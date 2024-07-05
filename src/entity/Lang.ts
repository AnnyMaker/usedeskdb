import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Token} from "./Token";

@Entity({
    name: 'lang'
})
export class Lang {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @OneToMany(() => Token, token => token.lang)
    tokens: Token[]
}