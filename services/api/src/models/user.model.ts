import {
  Column,
  CreatedAt,
  DataType,
  Default,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { Session } from '@models/session.model';
import { ConfirmationHash } from '@models/confirmation-hash.model';

interface UserCreationAttributes {
  email: string;
}

@Table({
  tableName: 'users'
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
    field: 'account_confirm'
  })
  accountConfirm: boolean;

  @HasMany(() => ConfirmationHash)
  confirmationHashes: ConfirmationHash[];

  @HasOne(() => Session)
  session: Session;

  @HasMany(() => ConfirmationHash)
  confirmationHash: ConfirmationHash[];

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
