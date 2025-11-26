import Order from '../models/order'
import data from '../mock/orderMock.json'
export const orders = async () => {
  //creo que no es necesario mostrar todos los pedidos ya que se deberian mostrar por ID
  return data
}
export const orderID = async (id: number) => {
  const order = data.find(p => p.id_order === id)
  if (!order) {
    throw new Error('Pedido no encontrado')
  }
  return order
}
export const createOrder = async (pedidoData: Order) => {
  const existing = await orderID(pedidoData.id_order).catch(() => null)
  if (existing) {
    throw new Error('Pedido ya existente')
  }
  const order = new Order(pedidoData)
  data.push(order)
  return order
}
export const deleteOrder = async (id: number) => {
  const order = await orderID(id)
  if (!order) {
    throw new Error('Pedido no encontrado')
  }
  const orderIn = data.findIndex(p => p.id_order === id)
  if (orderIn >= 0) data.splice(orderIn, 1)
  return {message: 'Pedido eliminado con exito'}
}
export const modifyOrder = async (id: number, pedidoData: Order) => {
  const order = await orderID(id)
  if (!order) {
    throw new Error('Pedido no encontrado') //tirar un error es necesario cuando ya tira error order ID?
  } else {
    order.state = pedidoData.state
    order.date = pedidoData.date
    order.total = pedidoData.total
    // no creo necesario modificar id e id usuario
    return order
  }
}
