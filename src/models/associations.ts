import User from './user'
import Product from './product'
import Order from './order'
import OrderDetail from './orderDetail'

export function initAssociations() {
  // 1. User <--> Order
  User.hasMany(Order, {foreignKey: 'id_user'})
  Order.belongsTo(User, {foreignKey: 'id_user'})

  // 2. Order <--> OrderDetail
  Order.hasMany(OrderDetail, {foreignKey: 'id_order'})
  OrderDetail.belongsTo(Order, {foreignKey: 'id_order'})

  // 3. Product <--> OrderDetail
  Product.hasMany(OrderDetail, {foreignKey: 'id_product'})
  OrderDetail.belongsTo(Product, {foreignKey: 'id_product'})
}
