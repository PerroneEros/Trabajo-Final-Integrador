import {DataTypes, Model, Optional} from 'sequelize'
import OrderDetailAttributes from './Interface/orderDetailAttributes'
import sequelize from '../database/db'
type orderCreationAttributes = Optional<OrderDetailAttributes, 'id_detail'>
class OrderDetail
  extends Model<OrderDetailAttributes, orderCreationAttributes>
  implements OrderDetailAttributes
{
  declare id_detail: number
  declare id_order: number
  declare id_product: number
  declare amount: number
  declare unit_price: number
}
OrderDetail.init(
  {
    id_detail: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    id_order: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Orders',
        key: 'id_order',
      },
    },
    id_product: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id_product',
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'OrderDetail',
    timestamps: true,
    underscored: true,
  },
)

export default OrderDetail
