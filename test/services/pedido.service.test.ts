import {describe, it, expect} from 'vitest'
import * as orderService from '../../src/services/order.Service'

describe('Pedido Service', () => {
  it('pedido devuelve array', async () => {
    const res = await orderService.orders()
    expect(Array.isArray(res)).toBe(true)
  })

  it('pedidoID devuelve pedido existente', async () => {
    const pedido = await orderService.orderID(1)
    expect(pedido).toHaveProperty('id_order')
  })

  it('agregarPedido crea un nuevo pedido', async () => {
    const pedido: any = {
      id_order: 123,
      id_user: 1,
      state: 'nuevo',
      date: '2025-10-26',
      amount: 0,
    }
    const created = await orderService.createOrder(pedido)
    expect(created).toHaveProperty('id_order')
  })

  it('actualizarPedido modifica un pedido', async () => {
    const updated = await orderService.modifyOrder(123, {
      state: 'mod',
      date: '2025-10-27',
      amount: 10,
    } as any)
    expect(updated).toBeDefined()
    expect(updated.state).toBe('mod')
  })

  it('eliminarPedido devuelve mensaje', async () => {
    const res = await orderService.deleteOrder(123)
    expect(res).toHaveProperty('message')
  })
})
