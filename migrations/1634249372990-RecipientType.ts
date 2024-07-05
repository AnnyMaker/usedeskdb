import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class RecipientType1634249372990 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'recipient_type',
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
        await queryRunner.dropTable('recipient_type');
    }

}
