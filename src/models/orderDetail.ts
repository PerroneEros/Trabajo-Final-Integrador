import OrderDetailAttributes from './Interface/orderDetailAttributes'

class OrderDetail implements OrderDetailAttributes {
  public id_detail!: number
  public id_order!: number
  public id_product!: number
  public amount!: number
  public unit_price!: number
  constructor(OrderDetail: OrderDetail) {
    this.id_detail = OrderDetail.id_detail
    this.id_order = OrderDetail.id_order
    this.id_product = OrderDetail.id_product
    this.amount = OrderDetail.amount
    this.unit_price = OrderDetail.unit_price
  }
}

export default OrderDetail
