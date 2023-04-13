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

interface CommentCreationAttributes {
  postId: string;
  userId: string;
  payload: string;
}

class IRate {
  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false,
    default: 'uuidv4',
    description: 'Unique Id of the user'
  })
  userId: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Rate (either positive or negative)'
  })
  rate: '+' | '-';
}

@Table({
  tableName: 'comments'
})
export class Comment extends Model<Comment, CommentCreationAttributes> {
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
    type: String,
    format: 'uuid',
    nullable: false,
    description: 'Post Id'
  })
  @Column({ type: DataType.UUID, allowNull: false, field: 'post_id' })
  postId: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Comment payload'
  })
  @Column({ type: DataType.TEXT, allowNull: false })
  payload: string;

  @ApiProperty({
    type: [IRate],
    nullable: false,
    description: 'List of users rates of comment'
  })
  @Default([])
  @Column({ type: DataType.ARRAY(DataType.JSON), allowNull: false })
  rates: Array<IRate>;

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
