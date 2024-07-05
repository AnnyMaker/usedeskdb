import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

const tableName = 'tokens';

export class Tokens1634295608109 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: tableName,
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isPrimary: true
                },
                {
                    name: 'token',
                    type: 'varchar',
                },
                {
                    name: 'timestamp',
                    type: 'timestamp',
                    default: 'NOW()'
                },
                {
                    name: 'lang_id',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'recipient_id',
                    type: 'int',
                    isNullable: true
                }
            ]
        }));
        await queryRunner.createForeignKey(tableName, new TableForeignKey({
            columnNames: ['lang_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'lang',
            onDelete: 'CASCADE'
        }));
        await queryRunner.createForeignKey(tableName, new TableForeignKey({
            columnNames: ['recipient_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'recipients',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(tableName);
    }

}
