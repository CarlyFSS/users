import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRolesTable1625081466796
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enables UUID generation (doesn't need to be removed in rollback)
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

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
            comment:
              'A UUID is simply a 128-bit unique value that can be expressed as either a larger number or a string. Must be an *valid* UUID.',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            length: '10',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
            comment: 'When the entity was created',
            length: '24',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()',
            comment: 'When the entity was last updated',
            length: '24',
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
    await queryRunner.dropTable('roles');
  }
}
