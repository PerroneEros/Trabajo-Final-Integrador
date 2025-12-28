import OrderDetail from '../models/orderDetail'
export const orderDetailID = async (id: number) => {
  const detail = await OrderDetail.findByPk(id)
  if (!detail) {
    throw new Error('Detalle no encontrado')
  }
  return detail
}
export const modifyDetail = async (id: number, DetailData: OrderDetail) => {
  const detail = await orderDetailID(id)
  await detail.update(DetailData)
  return detail
}
export const deleteDetail = async (id: number) => {
  const detail = await orderDetailID(id)
  await detail.destroy()
  return {message: 'Detalle de orden eliminado'}
}
export const createDetail = async (DetailData: OrderDetail) => {
  const detail = await OrderDetail.create(DetailData)
  return detail
}
