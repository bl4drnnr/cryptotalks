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

interface CryptocurrencyCreationAttributes {
  uuid: string;
  symbol: string;
  name: string;
  iconUrl: string;
  Volume24h: string;
  marketCap: string;
  price: number;
  btcPrice: number;
  change: number;
  coinrankingUrl: string;
  sparkline: Array<string>;
  rank: number;
  tier: number;
}

@Table({
  tableName: 'cryptocurrencies'
})
export class Cryptocurrency extends Model<
  Cryptocurrency,
  CryptocurrencyCreationAttributes
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
    type: String,
    format: 'uuid',
    nullable: false,
    description: 'Unique Id of the coin provided by API'
  })
  @Column({ type: DataType.UUID, allowNull: false })
  uuid: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Symbol of a coin'
  })
  @Column({ type: DataType.STRING, allowNull: false })
  symbol: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Name of a coin'
  })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    type: String,
    nullable: true,
    description: 'Description of a coin'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  description?: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Icon URL of a coin'
  })
  @Column({ type: DataType.STRING, allowNull: false, field: 'icon_url' })
  iconUrl: string;

  @ApiProperty({
    type: String,
    nullable: true,
    description: 'Website of a coin'
  })
  @Column({ type: DataType.STRING, allowNull: true, field: 'website_url' })
  websiteUrl?: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: '24H volume of a coin'
  })
  @Column({ type: DataType.STRING, allowNull: false, field: 'volume_24h' })
  Volume24h: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Market cap of a coin'
  })
  @Column({ type: DataType.STRING, allowNull: false, field: 'market_cap' })
  marketCap: string;

  @ApiProperty({
    type: Number,
    nullable: false,
    description: 'Price of a coin'
  })
  @Column({ type: DataType.DOUBLE(8), allowNull: false })
  price: number;

  @ApiProperty({
    type: Number,
    nullable: false,
    description: 'Price of a coin to BTC'
  })
  @Column({ type: DataType.DOUBLE(8), allowNull: false, field: 'btc_price' })
  btcPrice: number;

  @ApiProperty({
    type: Number,
    nullable: false,
    description: 'Change of a coin'
  })
  @Column({ type: DataType.DOUBLE(8), allowNull: false })
  change: number;

  @ApiProperty({
    type: 'number',
    nullable: false,
    description: 'URL of a coin on coinranking.com'
  })
  @Column({ type: DataType.STRING, allowNull: false, field: 'coinranking_url' })
  coinrankingUrl: string;

  @ApiProperty({
    type: [String],
    nullable: false,
    description: 'Sparkline of a coin'
  })
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  sparkline: Array<string>;

  @ApiProperty({
    type: Number,
    nullable: false,
    description: 'Rank of a coin'
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  rank: number;

  @ApiProperty({
    type: Number,
    nullable: false,
    description: 'Tier of a coin'
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  tier: number;

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
