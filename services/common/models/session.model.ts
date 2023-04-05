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

interface SessionCreationAttributes {
  tokenId: string;
  userId: string;
}

@Table({
  tableName: 'sessions'
})
export class Session extends Model<Session, SessionCreationAttributes> {
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
    description: 'Id of the token'
  })
  @Column({ type: DataType.UUID, allowNull: false, field: 'token_id' })
  tokenId: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false,
    description: 'User id'
  })
  @Column({ type: DataType.UUID, allowNull: false, field: 'user_id' })
  userId: string;

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
