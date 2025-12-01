import {describe, it, expect} from 'vitest'
import request from 'supertest'
import app from './../../src/app'
import mockOrder from '../../src/mock/orderMock.json'

describe('Pruebas de integración para Pedidos (Mock)', () => {
  describe('GET /api/order', () => {
    it('Debería retornar todos los pedidos', async () => {
      const response = await request(app).get('/api/order')
      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockOrder)
    })
  })

  describe('GET /api/order/:id', () => {
    it('Debería retornar un pedido específico si el id existe', async () => {
      const orderExist = mockOrder[0]
      const response = await request(app).get(
        `/api/order/${orderExist.id_order}`,
      )
      expect(response.status).toBe(200)
      expect(response.body).toEqual(orderExist)
    })

    it('Debería retornar un error si el pedido no existe', async () => {
      const id = 9999
      const response = await request(app).get(`/api/order/${id}`)
      expect(response.status).toBe(500)
    })
  })

  describe('POST /api/order', () => {
    it('Debería crear un nuevo pedido', async () => {
      const id = mockOrder.length + 1
      const newOrder = {
        id_order: id,
        id_user: 'Jayson',
        date: '1/1/2026',
        state: 'en preparacion',
        total: 100,
      }

      const response = await request(app).post('/api/order').send(newOrder)

      expect(response.status).toBe(201)
      expect(response.body.mesage).toBe('Pedido creado con exito')
      expect(response.body.result).toEqual(newOrder)
    })
  })

  describe('PUT /api/order/', () => {
    it('Debería actualizar un pedido existente', async () => {
      const orderUpdate = {...mockOrder[1]}
      orderUpdate.state = 'entregado'

      const response = await request(app).put('/api/order/').send(orderUpdate)

      expect(response.status).toBe(200)
      expect(response.body.message).toBe('pedido actualizado')
      expect(response.body.result.state).toBe('entregado')
    })
  })

  describe('DELETE /api/order/:id', () => {
    it('Debería eliminar un pedido existente', async () => {
      const orderDelete = mockOrder[3]
      const response = await request(app).delete(
        `/api/order/${orderDelete.id_order}`,
      )

      expect(response.status).toBe(200)
      expect(response.body.message).toBe('Pedido eliminado con exito')
    })
  })
})
