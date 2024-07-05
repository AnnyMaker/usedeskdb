import {MigrationInterface, QueryRunner} from "typeorm";
import {createMessageTable} from "./utility/create";
import {TablesName} from "./utility/TablesName";

export class deleteMessageTable1637800813843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TablesName.message)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await createMessageTable(queryRunner);
    }

}
