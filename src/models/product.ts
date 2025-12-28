import {DataTypes, Model, Optional} from 'sequelize'
import ProductAttributes from './Interface/productAttributes'
import sequelize from '../database/db'
type productCreationAttributes = Optional<ProductAttributes, 'id_product'>
class Product
  extends Model<ProductAttributes, productCreationAttributes>
  implements ProductAttributes
{
  declare id_product: number
  declare name: string
  declare description: string | ''
  declare price: number
  declare stock: number
  declare category: string
  declare image: string
}
Product.init(
  {
    id_product: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'Products',
    timestamps: true,
    underscored: true,
  },
)

export default Product
