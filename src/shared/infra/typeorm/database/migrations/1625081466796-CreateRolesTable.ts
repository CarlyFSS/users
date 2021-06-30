import { query } from 'express';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRolesTable1625081466796
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    // Add default roles
    await queryRunner.query(`INSERT INTO roles(name) VALUES ('SYSADMIN');`);
    await queryRunner.query(`INSERT INTO roles(name) VALUES ('ADMIN');`);
    await queryRunner.query(`INSERT INTO roles(name) VALUES ('MANAGER');`);
    await queryRunner.query(`INSERT INTO roles(name) VALUES ('EMPLOYEE');`);
    await queryRunner.query(`INSERT INTO roles(name) VALUES ('CLIENT');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tenants');
  }
}
