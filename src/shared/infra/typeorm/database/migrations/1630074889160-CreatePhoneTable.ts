import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreatePhoneTable1630074889160
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'phones',
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
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'country',
            type: 'smallint',
          },
          {
            name: 'prefix',
            type: 'smallint',
          },
          {
            name: 'number',
            type: 'varchar',
          },
          {
            name: 'verified',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('phones', [
      new TableForeignKey({
        name: 'PhoneUser',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'main_phone_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKeys('users', [
      new TableForeignKey({
        name: 'UserPhone',
        columnNames: ['main_phone_id'],
        referencedTableName: 'phones',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('phones', 'UserPhone');

    await queryRunner.dropColumn('users', 'main_phone_id');

    await queryRunner.dropForeignKey('phones', 'PhoneUser');

    await queryRunner.dropTable('phones');
  }
}
