import OrderAttributes from './Interface/orderAttributes'
class Order implements OrderAttributes {
  public id_order!: number
  public id_user!: string
  public date!: string
  public state!: string
  public total!: number
  constructor(orderData: Order) {
    this.id_order = orderData.id_order
    this.id_user = orderData.id_user
    this.date = orderData.date
    this.state = orderData.state
    this.total = orderData.total
  }
}

export default Order
