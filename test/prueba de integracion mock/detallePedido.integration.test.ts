import {describe, it, expect} from 'vitest'
import request from 'supertest'
import app from '../../src/app'
import mockDetail from '../../src/mock/orderDetailMock.json'
describe('Detalle pedido integration', () => {
  describe('get/api/detail', () => {
    it('deberia retornar el detail de un pedido con el ID', async () => {
      const detail = mockDetail[0]
      const response = await request(app).get(`/api/detail/${detail.id_detail}`)
      expect(response.status).toBe(200)
      expect(response.body).toEqual(detail)
    })

    it('deberia tirar error si el ID no coincide', async () => {
      const response = await request(app).get('/api/pedido/:500')
      expect(response.status).toBe(404) 
    })
  })
  describe('put/api/detail', () => {
    it('deberia actualizar un detail existente', async () => {
      const detail = {...mockDetail[0]}
      detail.unit_price = 30
      const response = await request(app).put('/api/detail').send(detail)
      console.log(response)
      expect(response.status).toBe(200)
      expect(response.body.mesage).toBe('Detalle modificado')
      expect(response.body.result.unit_price).toBe(30)
    })
  })
  describe('post/api/detail', () => {
    it('deberia crear un detail', async () => {
      const detail = {
        id_detail: 1,
        id_order: 6,
        id_product: 5,
        amount: 4,
        unit_price: 19.99,
      }
      const response = await request(app).post('/api/detail').send(detail)
      expect(response.status).toBe(201)
      expect(response.body).toEqual(detail)
    })
  })
  describe('delete/api/detail', () => {
    it('eliminar un detail existente', async () => {
      const detail = {...mockDetail[0]}
      const response = await request(app)
        .delete(`/api/detail/${detail.id_detail}`)
        .send(detail)
      expect(response.status).toBe(200)
      expect(response.body.message).toBe('Detalle eliminado con exito')
    })
  })
})
