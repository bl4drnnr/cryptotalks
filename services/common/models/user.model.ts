import {
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttributes {
  email: string;
  password: string;
}

@Table({
  tableName: 'users'
})
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({
    type: 'uuidv4',
    nullable: false,
    default: 'uuidv4',
    description: 'Unique Id of the record'
  })
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ApiProperty({
    type: 'string',
    nullable: false,
    description: 'User email'
  })
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @ApiProperty({
    type: 'string',
    nullable: false,
    description: 'User hashed password'
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    type: 'boolean',
    nullable: false,
    description:
      'Checks if user confirmed account by clicking into link in email after registration',
    default: false
  })
  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: 'account_confirm'
  })
  accountConfirm: boolean;

  @ApiProperty({
    type: 'string',
    nullable: true,
    description: 'User first name'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  firstName?: string;

  @ApiProperty({
    type: 'string',
    nullable: true,
    description: 'User last name'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  lastName?: string;

  @ApiProperty({
    type: 'string',
    nullable: false,
    description: 'User username'
  })
  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @ApiProperty({
    type: 'string',
    nullable: true,
    description: 'User Twitter account'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  twitter?: string;

  @ApiProperty({
    type: 'string',
    nullable: true,
    description: 'User LinkedIn account'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  linkedIn?: string;

  @ApiProperty({
    type: 'string',
    nullable: true,
    description: 'User personal website'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  personalWebsite?: string;

  @ApiProperty({
    type: 'string',
    nullable: true,
    description: 'User account title'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  title?: string;

  @ApiProperty({
    type: 'string',
    nullable: true,
    description: 'User biography'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  bio?: string;

  @ApiProperty({
    type: 'boolean',
    nullable: false,
    description: 'User accepted terms and conditions'
  })
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  tac: boolean;

  @ApiProperty({
    type: 'boolean',
    nullable: true,
    description: 'If user wants to set their email as public'
  })
  @Column({ type: DataType.BOOLEAN, allowNull: true })
  publicEmail?: boolean;

  @ApiProperty({
    type: 'date',
    nullable: false,
    description: 'Record creation date'
  })
  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    nullable: false,
    description: 'Record update date'
  })
  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
