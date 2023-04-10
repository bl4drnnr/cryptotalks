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

interface MarketStatsCreationAttributes {
  total: number;
  totalCoins: number;
  totalMarkets: number;
  totalExchanges: number;
  totalMarketCap: string;
  total24hVolume: string;
}

@Table({
  tableName: 'market_stats'
})
export class MarketStats extends Model<
  MarketStats,
  MarketStatsCreationAttributes
> {
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
    type: Number,
    nullable: false,
    description: 'Total'
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  total: number;

  @ApiProperty({
    type: Number,
    nullable: false,
    description: 'Total coins'
  })
  @Column({ type: DataType.INTEGER, allowNull: false, field: 'total_coins' })
  totalCoins: number;

  @ApiProperty({
    type: Number,
    nullable: false,
    description: 'Total markets'
  })
  @Column({ type: DataType.INTEGER, allowNull: false, field: 'total_markets' })
  totalMarkets: number;

  @ApiProperty({
    type: Number,
    nullable: false,
    description: 'Total exchanges'
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'total_exchanges'
  })
  totalExchanges: number;

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Total market cap'
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'total_market_cap'
  })
  totalMarketCap: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Total 24h volume'
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'total_daily_volume'
  })
  total24hVolume: string;

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
