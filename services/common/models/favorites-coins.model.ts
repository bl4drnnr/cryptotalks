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

interface FavoritesCoinsCreationAttributes {
  userId: string;
  favoriteCoins: Array<string>
}

@Table({
  tableName: 'favorite_coins'
})
export class FavoriteCoins extends Model<
  FavoriteCoins,
  FavoritesCoinsCreationAttributes
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
    type: [String],
    nullable: true,
    description: "List of user's favorite coins"
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
    field: 'favorite_coins'
  })
  favoriteCoins?: Array<string>;

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
