import {describe, it, expect} from 'vitest'
import {request} from '../../utils/request'

describe('Pedido API', () => {
  it('GET /api/pedido -> 200', async () => {
    const res = await request.get('/api/order')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('GET /api/pedido/:id -> 200', async () => {
    const res = await request.get('/api/order/1')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('id_order')
  })
})
