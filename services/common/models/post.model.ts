import {
  Table,
  Model,
  DataType,
  PrimaryKey,
  Default,
  Column,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

interface PostCreationAttributes {
  title: string;
  slug: string;
  content: Array<string>;
  userId: string;
}

@Table({
  tableName: "posts",
})
export class Post extends Model<Post, PostCreationAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  slug: string;

  @Column({ type: DataType.JSON, allowNull: false })
  content: Array<string>;

  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt: Date;
}
