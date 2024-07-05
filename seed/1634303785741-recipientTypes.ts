import {MigrationInterface, QueryRunner} from "typeorm";


const recipientTypes = [
  'USEDESK_CLIENT',
  'USEDESK_CHAT'
];

export class recipientTypes1634303785741 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO recipient_type(type) VALUES ("${recipientTypes.join('"), ("')}")`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM recipient_type WHERE type IN ("${recipientTypes.join('","')}")`)
    }

}
