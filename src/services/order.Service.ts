import Order from '../models/order'

export const orders = async () => {
  const order = await Order.findAll()
  return order
}

export const orderID = async (id: number) => {
  const order = await Order.findByPk(id)
  if (!order) {
    throw new Error('Pedido no encontrado')
  }
  return order
}

export const createOrder = async (pedidoData: Order) => {
  // Quitamos la validación de ID existente, dejamos que la DB cree uno nuevo
  try {
    const order = await Order.create(pedidoData)
    return order
  } catch (error) {
    throw new Error('Error al crear la orden')
  }
}

export const deleteOrder = async (id: number) => {
  const order = await orderID(id)
  await order.destroy()
  return {message: 'Pedido eliminado con exito'}
}

export const modifyOrder = async (id: number, pedidoData: Order) => {
  const order = await orderID(id)
  await order.update(pedidoData)
  return order
}
