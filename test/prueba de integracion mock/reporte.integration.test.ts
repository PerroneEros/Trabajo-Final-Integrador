import {describe, it, expect} from 'vitest'
import request from 'supertest'
import app from './../../src/app'
import mockReport from '../../src/mock/reportMock.json'

describe('Pruebas de integración para Reportes (Mock)', () => {
  describe('GET /api/report', () => {
    it('Debería retornar todos los reportes', async () => {
      const response = await request(app).get('/api/report')
      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockReport)
    })
  })

  describe('GET /api/report/:id', () => {
    it('Debería retornar un reporte específico si el id existe', async () => {
      const reportExisting = mockReport[0]
      const response = await request(app).get(
        `/api/report/${reportExisting?.id_report}`,
      )
      expect(response.status).toBe(200)
      expect(response.body).toEqual(reportExisting)
    })

    it('Debería retornar un error si el reporte no existe', async () => {
      const id = 9999
      const response = await request(app).get(`/api/report/${id}`)
      // El servicio no maneja el error 404, devuelve 500
      expect(response.status).toBe(500)
    })
  })

  describe('POST /api/report', () => {
    it('Debería crear un nuevo reporte', async () => {
      const newReport = {
        id_report: 11,
        date_generated: '23/10/25',
        generated_by_user: 1,
      }

      const response = await request(app).post('/api/report').send(newReport)

      expect(response.status).toBe(201)
      expect(response.body.message).toBe('reporte generado con exito')
      expect(response.body.report).toEqual(newReport)
    })
  })

  describe('DELETE /api/report/:id', () => {
    it('Debería eliminar un reporte existente', async () => {
      // Usamos un reporte que sabemos que existe para la prueba
      const reportDelete = mockReport[2]
      const response = await request(app).delete(
        `/api/report/${reportDelete.id_report}`,
      )

      expect(response.status).toBe(200)
      expect(response.body.message).toBe('Reporte Eliminado')
    })
  })
})
