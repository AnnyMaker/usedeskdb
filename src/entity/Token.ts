import {Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column} from "typeorm";
import {Lang} from "./Lang";
import {Recipient} from "./Recipient";
import {TokenType} from "./TokenType";

@Entity({
    name: 'tokens'
})
export class Token {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    token: string

    @Column({
        type: 'timestamp'
    })
    timestamp: Date

    @ManyToOne(() => Recipient, recipient => recipient.tokens)
    @JoinColumn({
        name: 'recipient_id'
    })
    recipient: Recipient

    @ManyToOne(() => TokenType, tokenType => tokenType.tokens)
    @JoinColumn({
        name: 'token_type_id'
    })
    token_type: TokenType

    @ManyToOne(() => Lang, lang => lang.tokens)
    @JoinColumn({name: 'lang_id'})
    lang: Lang
}