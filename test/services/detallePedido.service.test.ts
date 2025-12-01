import {describe, it, expect} from 'vitest'
import * as detailService from '../../src/services/orderDetail.Service'

describe('DetallePedido Service', () => {
  it('DetallePedidoID debería devolver el detalle por id_order', async () => {
    const detalle = await detailService.orderDetailID(6)
    expect(detalle).toBeDefined()
    expect(detalle).toHaveProperty('id_order')
    expect(detalle.id_detail).toBe(6)
  })

  it('crearDetalle debería añadir y devolver el nuevo detalle', async () => {
    const newDetalle = {
      id_detail: 30,
      id_order: 30,
      id_product: 1,
      amount: 2,
      unit_price: 12.5,
    }
    const res = await detailService.createDetail(newDetalle as any)
    expect(res).toBeDefined()
    expect(res).toHaveProperty('id_detail')
    expect(res.id_detail).toBe(30)
  })

  it('modificarDetalle debería actualizar un detalle existente', async () => {
    const updated = await detailService.modifyDetail(6, {
      amount: 11,
      unit_price: 1.11,
    } as any)
    expect(updated).toBeDefined()
    expect(updated.amount).toBe(11)
    expect(updated.unit_price).toBe(1.11)
  })

  it('eliminarDetalle debería devolver mensaje de éxito', async () => {
    const res = await detailService.deleteDetail(1)
    expect(res).toBeDefined()
    expect(res).toHaveProperty('message')
    expect(res.message).toMatch('Detalle eliminado')
  })
})
