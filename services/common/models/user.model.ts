import {
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

interface UserCreationAttributes {
  email: string;
  password: string;
}

@Table({
  tableName: "users",
})
export class User extends Model<User, UserCreationAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  password?: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: "account_confirm",
  })
  accountConfirm: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  firstName?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  lastName?: string;

  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, allowNull: true })
  twitter?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  linkedIn?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  personalWebsite?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  title?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  bio?: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  tac: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  publicEmail?: boolean;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt: Date;
}
