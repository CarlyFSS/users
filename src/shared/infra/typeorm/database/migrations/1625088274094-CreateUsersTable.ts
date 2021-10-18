import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateUsersTable1625088274094
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            name: 'role_id',
            type: 'uuid',
            comment:
              'A UUID is simply a 128-bit unique value that can be expressed as either a larger number or a string. Must be an *valid* UUID.',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            length: '50',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '250',
            comment:
              'Must have at least: 6 characters, 1 Uppercase letter, 1 number and 1 of the following symbols "!@#$%^&*(){}-__+.)"',
          },
          {
            name: 'sex',
            type: 'varchar',
            isNullable: true,
            length: '6',
          },
          {
            name: 'birthdate',
            type: 'timestamptz',
            length: '24',
          },
          {
            name: 'document_number',
            type: 'varchar',
            isUnique: true,
            length: '11',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
            length: '24',
            comment: 'When the entity was created',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()',
            length: '24',
            comment: 'When the entity was updated',
          },
          {
            name: 'deleted_at',
            type: 'timestamptz',
            isNullable: true,
            length: '24',
            comment: 'When the entity was deleted',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('users', [
      new TableForeignKey({
        name: 'UsersRole',
        columnNames: ['role_id'],
        referencedTableName: 'roles',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'UsersRole');

    await queryRunner.dropTable('users');
  }
}
