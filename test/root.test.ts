import {describe, it, expect} from 'vitest'
import {request} from './utils/request'

describe('Root endpoint', () => {
  it('GET / -> 200 and welcome message', async () => {
    const res = await request.get('/')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toContain('API de Agro-Insumos')
  })
})
