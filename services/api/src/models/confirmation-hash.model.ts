import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { User } from '@models/user.model';

interface ConfirmationHashCreationAttributes {
  userId: string;
  confirmationHash: string;
}

@Table({
  tableName: 'confirmation_hashes'
})
export class ConfirmationHash extends Model<
  ConfirmationHash,
  ConfirmationHashCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'confirmation_hash'
  })
  confirmationHash: string;

  @Default(false)
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  confirmed: boolean;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false, field: 'user_id' })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
