import {MigrationInterface, QueryRunner, Table} from "typeorm";
import {TablesName} from "./utility/TablesName";

export class TokenType1636383900945 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: TablesName.tokenType,
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isPrimary: true
                },
                {
                    name: 'type',
                    type: 'varchar',
                    isUnique: true
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TablesName.tokenType);
    }

}
