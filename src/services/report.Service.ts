import Report from '../models/report'

// Mostar reporte recientes
export const reports = async () => {
  const reports = await Report.findAll()
  return reports
}
export const createReport = async (reportData: Report) => {
  const newReport = await Report.create(reportData)
  return newReport
}
export const findReport = async (id: number) => {
  const report = await Report.findByPk(id)
  if (!report) {
    throw new Error('Reporte no encontrado')
  }
  return report
}
export const deleteReport = async (id: number) => {
  const report = await findReport(id)
  await report.destroy()
  return {message: 'Reporte Eliminado'}
}
