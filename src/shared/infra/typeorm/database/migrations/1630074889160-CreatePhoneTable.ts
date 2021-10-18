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
            comment:
              'A UUID is simply a 128-bit unique value that can be expressed as either a larger number or a string. Must be an *valid* UUID.',
          },
          {
            name: 'user_id',
            type: 'uuid',
            comment:
              'A UUID is simply a 128-bit unique value that can be expressed as either a larger number or a string. Must be an *valid* UUID.',
          },
          {
            name: 'country_code',
            type: 'varchar',
            length: '8',
          },
          {
            name: 'prefix',
            type: 'varchar',
            length: '4',
          },
          {
            name: 'number',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'verified',
            type: 'boolean',
            comment: 'Controls if the phone number has been verified or not',
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
        name: 'phone_id',
        type: 'uuid',
        isNullable: true,
        comment:
          'A UUID is simply a 128-bit unique value that can be expressed as either a larger number or a string. Must be an *valid* UUID.',
      }),
    );

    await queryRunner.createForeignKeys('users', [
      new TableForeignKey({
        name: 'UserPhone',
        columnNames: ['phone_id'],
        referencedTableName: 'phones',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'UserPhone');

    await queryRunner.dropColumn('users', 'phone_id');

    await queryRunner.dropForeignKey('phones', 'PhoneUser');

    await queryRunner.dropTable('phones');
  }
}
