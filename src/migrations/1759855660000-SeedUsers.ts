/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1759855660000 implements MigrationInterface {
    name = 'SeedUsers1759855660000'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO user (name, email, password, age) VALUES
        ('Alice', 'alice@example.com', 'password123', 30),
        ('Bob', 'bob@example.com', 'password123', 25)
        `);
}
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DELETE FROM user WHERE email IN ('alice@example.com', 'bob@example.com')
        `);
        }
    }