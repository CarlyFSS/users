import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateAddressTable1629222319291
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'addresses',
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
            name: 'country',
            type: 'varchar',
            length: '30',
          },
          {
            name: 'state',
            type: 'varchar',
            length: '30',
          },
          {
            name: 'city',
            type: 'varchar',
            length: '30',
          },
          {
            name: 'street',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'number',
            type: 'smallint',
          },
          {
            name: 'district',
            type: 'varchar',
            length: '30',
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true,
            length: '30',
          },
          {
            name: 'postal_code',
            type: 'varchar',
            length: '12',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
            length: '25',
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

    await queryRunner.createForeignKeys('addresses', [
      new TableForeignKey({
        name: 'AddressUser',
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
        name: 'main_address_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKeys('users', [
      new TableForeignKey({
        name: 'UserAddress',
        columnNames: ['main_address_id'],
        referencedTableName: 'addresses',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'UserAddress');

    await queryRunner.dropColumn('users', 'main_address_id');

    await queryRunner.dropForeignKey('addresses', 'AddressUser');

    await queryRunner.dropTable('addresses');
  }
}
