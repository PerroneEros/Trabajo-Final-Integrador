import {describe, it, expect} from 'vitest'
import {request} from '../../utils/request'

describe('Reportes API', () => {
  it('GET /api/report -> 200', async () => {
    const res = await request.get('/api/report')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /api/report -> 201 crear reporte', async () => {
    const reporte = {
      id_report: 20,
      title: 'Reporte Test',
      description: 'Descripcion pruebas',
      date: '2025-10-26',
    } //report no usa titulo ni descripcion
    const res = await request.post('/api/report').send(reporte)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('message')
    expect(res.body.report).toHaveProperty('id_report')
  })
})
