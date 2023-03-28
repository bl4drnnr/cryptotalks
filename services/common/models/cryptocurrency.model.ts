import {Model, Table} from "sequelize-typescript";

interface CryptocurrencyCreationAttributes {

}

@Table({
  tableName: 'cryptocurrencies'
})
export class Cryptocurrency extends Model<Cryptocurrency, CryptocurrencyCreationAttributes> {
  //
}
