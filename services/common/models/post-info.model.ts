import {
  Column,
  Comment,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface PostInfoCreationAttributes {
  postId: string;
  userId: string;
  comment: string;
}

class IRate {
  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Username'
  })
  username: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false,
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

class IComment {
  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false,
    default: 'uuidv4',
    description: 'Unique Id of the record'
  })
  id: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Username'
  })
  username: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false,
    description: 'Unique Id of the user'
  })
  userId: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Rate (either positive or negative)'
  })
  commentRates: Array<IRate>;

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Comment payload'
  })
  payload: string;

  @ApiProperty({
    type: Date,
    nullable: false,
    description: 'Date when comment has been left'
  })
  createdAt: Date;
}

@Table({
  tableName: 'post_info'
})
export class PostInfo extends Model<PostInfo, PostInfoCreationAttributes> {
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
    description: 'Post Id'
  })
  @Column({ type: DataType.UUID, allowNull: false, field: 'post_id' })
  postId: string;

  @ApiProperty({
    type: [IRate],
    nullable: false,
    description: 'List of users rates of post'
  })
  @Default([])
  @Column({ type: DataType.JSONB, allowNull: false })
  rates: Array<IRate>;

  @ApiProperty({
    type: [IComment],
    nullable: false,
    description: 'List of id of comments'
  })
  @Default([])
  @Column({ type: DataType.JSONB, allowNull: false })
  comments: Array<IComment>;

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
