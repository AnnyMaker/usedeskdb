import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Recipients1634249565272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'recipients',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'external_id',
                    type: 'varchar'
                },
                {
                    name: 'recipient_type_id',
                    type: 'int',
                    isNullable: true
                }
            ]
        }));
        await queryRunner.createForeignKey('recipients', new TableForeignKey({
            columnNames: ['recipient_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'recipient_type',
            onDelete: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('recipients');
    }

}
