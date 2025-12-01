import OrderDetail from '../models/orderDetail'
import data from '../mock/orderDetailMock.json'
export const orderDetailID = async (id: number) => {
  const detail = data.find(d => d.id_detail === id)
  if (!detail) {
    throw new Error('Detalle no encontrado')
  }
  return detail
}
export const modifyDetail = async (id: number, DetailData: OrderDetail) => {
  const detail = await orderDetailID(id)
  if (detail) {
    detail.amount = DetailData.amount
    detail.unit_price = DetailData.unit_price
    return detail
  }
}
export const deleteDetail = async (id: number) => {
  const detail = await orderDetailID(id)
  if (detail) {
    const detailIN = data.findIndex(d => d.id_detail === id)
    if (detailIN >= 0) data.splice(detailIN, 1)
    return {message: 'Detalle eliminado con exito'}
  }
}
export const createDetail = async (DetailData: OrderDetail) => {
  const detail = await new OrderDetail(DetailData)
  data.push(detail)
  return detail
}
