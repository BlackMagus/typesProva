import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewsletterToUser1784018845843 implements MigrationInterface {
    name = 'AddNewsletterToUser1784018845843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isSubscribed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "subscribedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "subscribedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isSubscribed"`);
    }

}
