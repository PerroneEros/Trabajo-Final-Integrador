import {DataTypes, Model, Optional} from 'sequelize'
import OrderAttributes from './Interface/orderAttributes'
import sequelize from '../database/db'
type orderCreationAttributes = Optional<OrderAttributes, 'id_order'>
class Order
  extends Model<OrderAttributes, orderCreationAttributes>
  implements OrderAttributes
{
  declare id_order: number
  declare id_user: number
  declare date: Date
  declare state: string
  declare total: number
}
Order.init(
  {
    id_order: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id_user',
      },
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pendiente',
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Orders',
    timestamps: true,
    underscored: true,
  },
)

export default Order
