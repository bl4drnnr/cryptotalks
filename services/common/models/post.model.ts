import {
  Table,
  Model,
  DataType,
  PrimaryKey,
  Default,
  Column,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface PostCreationAttributes {
  title: string;
  slug: string;
  content: Array<string>;
  preview: string;
  userId: string;
}

@Table({
  tableName: 'posts'
})
export class Post extends Model<Post, PostCreationAttributes> {
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
    nullable: false,
    description: 'Title of the post'
  })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Slug of the post'
  })
  @Column({ type: DataType.STRING, allowNull: false })
  slug: string;

  @ApiProperty({
    type: [String],
    nullable: false,
    description: 'Content of the post'
  })
  @Column({ type: DataType.ARRAY(DataType.TEXT), allowNull: false })
  content: Array<string>;

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Short preview of the post'
  })
  @Column({ type: DataType.TEXT, allowNull: false })
  preview: string;

  @ApiProperty({
    type: [String],
    nullable: false,
    description: 'Search tags'
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    field: 'search_tags'
  })
  searchTags: Array<string>;

  @ApiProperty({
    type: 'uuiv4',
    nullable: false,
    description: 'User Id'
  })
  @Column({ type: DataType.UUID, allowNull: false, field: 'user_id' })
  userId: string;

  @ApiProperty({
    type: [String],
    nullable: false,
    description: 'List of users who liked post'
  })
  @Default([])
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  likes: Array<string>;

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
