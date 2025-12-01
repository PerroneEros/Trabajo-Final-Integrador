import Report from '../models/report'
import data from '../mock/reportMock.json'

// Mostar reporte recientes
export const reports = async () => {
  return data
}
export const createReport = async (reporteData: Report) => {
  const newReporte = await new Report(reporteData)
  data.push(newReporte)
  return newReporte
}
export const findReport = async (id: number) => {
  const reporte = data.find(r => r.id_report === id)
  if (!reporte) {
    throw new Error('Reporte no encontrado')
  }
  return reporte
}
export const deleteReport = async (id: number) => {
  const reporte = await findReport(id)
  if (reporte) {
    const reporteI = data.findIndex(r => r.id_report === id)
    if (reporteI >= 0) data.splice(reporteI, 1)
    return {message: 'Reporte Eliminado'}
  }
  throw new Error('reporte no existe')
}
