import {describe, it, expect} from 'vitest'
import request from 'supertest'
import app from './../../src/app'
import mockProduct from '../../src/mock/productMock.json'
import {token} from '../utils/request'
describe('Pruebas de integración para productos (Mock)', () => {
  describe('GET /api/products', () => {
    it('Debería retornar todos los productos del mock', async () => {
      const response = await request(app).get('/api/products')
      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockProduct)
    })
  })

  describe('GET /api/products/:id', () => {
    it('Debería retornar un producto específico si el id existe', async () => {
      const productExisting = mockProduct[0]
      const response = await request(app).get(
        `/api/products/${productExisting?.id_product}`,
      )
      expect(response.status).toBe(200)
      expect(response.body).toEqual(productExisting)
    })

    it('Debería retornar un error 404 si el producto no existe', async () => {
      const idInexistente = 9999
      const response = await request(app).get(`/api/products/${idInexistente}`)
      expect(response.status).toBe(404)
      expect(response.body).toEqual({message: 'Producto no encontrado'})
    })
  })

  describe('POST /api/products', () => {
    it('Debería crear un nuevo producto y retornarlo', async () => {
      const newOrder = {
        id_product: 99,
        name: 'Producto de prueba',
        description: 'Este es un producto de prueba',
        price: 100,
        stock: 10,
        category: 'Pruebas',
      }

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send(newOrder)

      expect(response.status).toBe(201)
      expect(response.body.message).toBe('Producto creado con éxito')
      expect(response.body.product).toEqual(expect.objectContaining(newOrder))

      
      const getResponse = await request(app).get('/api/products/99')
      expect(getResponse.status).toBe(200)
      expect(getResponse.body).toEqual(expect.objectContaining(newOrder))
    })
  })
})
