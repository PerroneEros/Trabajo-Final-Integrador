import {describe, it, expect} from 'vitest'
import * as reportService from '../../src/services/report.Service'

describe('Reporte Service', () => {
  it('reportes devuelve array', async () => {
    const res = await reportService.reports()
    expect(Array.isArray(res)).toBe(true)
  })

  it('generarReporte y findReporte funcionan', async () => {
    const reporte: any = {
      id_report: 777,
      title: 'T',
      descripcion: 'D',
      date: '2025-10-26',
    }
    const created = await reportService.createReport(reporte)
    expect(created).toHaveProperty('id_report')
    const found = await reportService.findReport(777)
    expect(found).toHaveProperty('id_report')
    const del = await reportService.deleteReport(777)
    expect(del).toHaveProperty('message')
  })
})
