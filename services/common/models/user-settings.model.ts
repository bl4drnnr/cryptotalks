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
import { Col } from 'sequelize/types/utils';

interface UserSettingsCreationAttributes {
  userId: string;
}

@Table({
  tableName: 'user_settings'
})
export class UserSettings extends Model<
  UserSettings,
  UserSettingsCreationAttributes
> {
  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false,
    default: 'uuidv4',
    description: 'Unique Id of the record'
  })
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false,
    description: 'User Id'
  })
  @Column({ type: DataType.UUID, allowNull: false, field: 'user_id' })
  userId: string;

  @ApiProperty({
    type: Boolean,
    nullable: true,
    description: 'If user wants to set their email as public'
  })
  @Default(false)
  @Column({ type: DataType.BOOLEAN, allowNull: true, field: 'public_email' })
  publicEmail?: boolean;

  @ApiProperty({
    type: Boolean,
    nullable: false,
    description: 'User is allowed to change email only one time'
  })
  @Default(false)
  @Column({ type: DataType.BOOLEAN, allowNull: false, field: 'email_changed' })
  emailChanged: boolean;

  @ApiProperty({
    type: Boolean,
    nullable: true,
    description: 'Contains 2FA token if user set it up'
  })
  @Column({ type: DataType.STRING, allowNull: true, field: 'two_fa_token' })
  twoFaToken?: string;

  @ApiProperty({
    type: Boolean,
    nullable: true,
    description: 'Users are allowed to change password only 1 time'
  })
  @Column({ type: DataType.DATE, allowNull: true, field: 'password_changed' })
  passwordChanged?: Date;

  @ApiProperty({
    type: Date,
    nullable: false,
    description: 'Record creation date'
  })
  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    nullable: false,
    description: 'Record update date'
  })
  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
