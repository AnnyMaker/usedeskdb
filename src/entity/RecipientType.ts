import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {Recipient} from "./Recipient";


@Entity('recipient_type')
export class RecipientType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string

    @OneToMany( () => Recipient, recipient => recipient.recipient_type)
    recipients: Recipient[]
}