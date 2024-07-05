import {MigrationInterface, QueryRunner} from "typeorm";
import {createMessageTypeTable} from "./utility/create";
import {TablesName} from "./utility/TablesName";

export class MessageType1633368364883 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await createMessageTypeTable(queryRunner)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TablesName.messageType);
    }

}
