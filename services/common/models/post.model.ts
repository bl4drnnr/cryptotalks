import {
  Table,
  Model,
  DataType,
  PrimaryKey,
  Default,
  Column,
  CreatedAt,
  UpdatedAt
  // @ts-ignore
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface PostCreationAttributes {
  title: string;
  slug: string;
  content: Array<string>;
  userId: string;
}

@Table({
  tableName: 'posts'
})
export class Post extends Model<Post, PostCreationAttributes> {
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
    description: 'Title of the post'
  })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    type: 'string',
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
  @Column({ type: DataType.JSON, allowNull: false })
  content: Array<string>;

  @ApiProperty({
    type: 'uuiv4',
    nullable: false,
    description: 'User Id'
  })
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

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
