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
    type: 'uuidv4',
    nullable: false,
    description: 'User Id'
  })
  @Column({ type: DataType.UUID, allowNull: false, field: 'user_id' })
  userId: string;

  @ApiProperty({
    type: 'boolean',
    nullable: true,
    description: 'If user wants to set their email as public'
  })
  @Column({ type: DataType.BOOLEAN, allowNull: true, field: 'public_email' })
  publicEmail?: boolean;

  @ApiProperty({
    type: 'boolean',
    nullable: true,
    description: 'Contains 2FA token if user set it up'
  })
  @Column({ type: DataType.STRING, allowNull: true, field: 'two_fa_token' })
  twoFaToken?: string;

  @ApiProperty({
    type: 'boolean',
    nullable: true,
    description: 'Users are allowed to change password only 1 time'
  })
  @Column({ type: DataType.DATE, allowNull: true, field: 'password_changed' })
  passwordChanged?: Date;

  @ApiProperty({
    type: 'date',
    nullable: false,
    description: 'Record creation date'
  })
  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Record update date'
  })
  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
