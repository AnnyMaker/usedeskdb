import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";
import {TablesName} from "./utility/TablesName";

export class addTokenTypeFieldInTokenTable1636384012839 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(TablesName.tokens, new TableColumn({
            name: 'token_type_id',
            type: 'int',
            isNullable: true
        }));
        await queryRunner.createForeignKey(TablesName.tokens, new TableForeignKey({
            columnNames: ['token_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: TablesName.tokenType,
            onDelete: 'SET NULL'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(TablesName.tokens);
        if(!table) {
            return;
        }
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('token_type_id') !== -1);

        if(foreignKey) {
            await queryRunner.dropForeignKey(TablesName.tokens, foreignKey);
        }
        await queryRunner.dropColumn(TablesName.tokens, 'token_type_id');
    }

}
