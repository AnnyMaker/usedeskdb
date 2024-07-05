import {MigrationInterface, QueryRunner} from "typeorm";
import {container, TYPES} from '../src/di'
import {LangService} from "../src/modules/language/types";
import {TablesName} from "../migrations/utility/TablesName";

const langService = container.get<LangService>(TYPES.LangService);
const languages = langService
    .getLangList()
    .map(s => s.trim())
    .filter(s => !!s)

export class langs1637899042236 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const insertsLanguages = languages.map(s => `('${s}')`).join();
        const sql = `INSERT INTO ${TablesName.lang}(code) 
                     VALUES ${insertsLanguages} 
                        ON DUPLICATE KEY UPDATE code = VALUES(code);`

        await queryRunner.query(sql);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const languagesRemove = languages.map(s => `'${s}'`).join();
        const sql = `DELETE FROM ${TablesName.lang} WHERE code IN (${languagesRemove})`
        await queryRunner.query(sql);
    }

}
