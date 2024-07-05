import {MigrationInterface, QueryRunner} from "typeorm";
import {createMessageTable} from "./utility/create";
import {TablesName} from "./utility/TablesName";


export class Message1633371060015 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await createMessageTable(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TablesName.message);
    }

}
