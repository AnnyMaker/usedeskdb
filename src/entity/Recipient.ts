import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import {Token} from "./Token";
import {RecipientType} from "./RecipientType";

@Entity('recipients')
export class Recipient {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    external_id: string

    @OneToMany(() => Token, token => token.recipient, {
        cascade: true,
        eager: true
    })
    tokens: Token[]

    @ManyToOne(() => RecipientType, recipientType => recipientType.recipients)
    @JoinColumn({
        name: 'recipient_type_id'
    })
    recipient_type: RecipientType;
}