import {MigrationInterface, QueryRunner} from "typeorm";
import {NotificationServicesName} from "../src/utility/NotificationServicesName";


const tokenTypes = Object.keys(NotificationServicesName);

export class defaultTokenTypes1636387600613 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO token_type(type) VALUES ("${tokenTypes.join('"), ("')}")`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM token_type WHERE type IN ("${tokenTypes.join('","')}")`)
    }

}
