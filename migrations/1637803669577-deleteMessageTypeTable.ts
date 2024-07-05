import {MigrationInterface, QueryRunner} from "typeorm";
import {createMessageTypeTable} from "./utility/create";
import {TablesName} from "./utility/TablesName";

export class deleteMessageTypeTable1637803669577 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TablesName.messageType)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await createMessageTypeTable(queryRunner);
    }

}
