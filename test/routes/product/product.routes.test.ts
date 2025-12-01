import {describe, it, expect} from 'vitest'
import {request, token} from '../../utils/request'
import jwt from 'jsonwebtoken'

describe('Products API', () => {
  it('GET /api/products -> 200 and an array', async () => {
    const res = await request.get('/api/products')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('GET /api/products/:id -> 200 and product object', async () => {
    const res = await request.get('/api/products/1')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('id_product')
    expect(res.body.id_product).toBe(1)
  })

  it('POST /api/products -> 201 create product', async () => {
    const payload = {
      id_product: 9999,
      name: 'Test Product',
      descripcion: 'Producto de prueba',
      categoria: 'Test',
      precio: 1.23,
      stock: 5,
    }
    const res = await request
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('message')
    expect(res.body.product).toHaveProperty('id_product')
    expect(res.body.product.name).toBe('Test Product')
  })

  it('PUT /api/products/:id -> 200 update product (protected)', async () => {
    const payload = {
      name: 'Updated Name',
      description: 'Updated',
      price: 9.99,
      stock: 10,
      category: 'Test',
    }
    const res = await request
      .put('/api/products/9999')
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message')
    expect(res.body.product.name || res.body.product).toBeDefined()
  })

  it('DELETE /api/products/:id -> 200 delete product (protected)', async () => {
    const token = jwt.sign(
      {id_user: 1, email: 'test@example.com'},
      process.env.JWT_SECRET as string,
    )
    const res = await request
      .delete('/api/products/9999')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message')
  })

  it('PUT /api/products/:id -> 401 without token', async () => {
    const payload = {name: 'No Auth'}
    const res = await request.put('/api/products/1').send(payload)
    expect(res.status).toBe(401)
  })
})
