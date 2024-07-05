import {QueryRunner, Table, TableForeignKey} from "typeorm";
import {TablesName} from "./TablesName";

export const createMessageTable = async (queryRunner: QueryRunner): Promise<void> => {

    await queryRunner.createTable(new Table({
        name: TablesName.message,
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
                name: 'text',
                type: 'text',
            },
            {
                name: 'message_type_id',
                type: 'int',
                isNullable: true
            },
            {
                name: 'lang_id',
                type: 'int',
                isNullable: true
            }
        ]
    }));
    await queryRunner.createForeignKey(TablesName.message, new TableForeignKey({
        columnNames: ['message_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: TablesName.messageType,
        onDelete: 'CASCADE'
    }));

    await queryRunner.createForeignKey(TablesName.message, new TableForeignKey({
        columnNames: ['lang_id'],
        referencedColumnNames: ['id'],
        referencedTableName: TablesName.lang,
        onDelete: 'CASCADE'
    }));
}

export const createMessageTypeTable = async (queryRunner: QueryRunner) => {
    await queryRunner.createTable(new Table({
        name: TablesName.messageType,
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
                name: 'code',
                type: 'varchar',
                isUnique: true
            }
        ]
    }))
}