import {Request, Response} from 'express'
import * as reporteService from '../services/report.Service'

export const getReports = async (req: Request, res: Response) => {
  try {
    const result = await reporteService.reports()
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) res.status(500).json(error.message)
  }
}

export const getReportID = async (req: Request, res: Response) => {
  try {
    const report = await reporteService.findReport(
      parseInt(req.params.id as string),
    )
    res.status(200).json(report)
  } catch (error) {
    if (error instanceof Error) res.status(500).json(error.message)
  }
}

export const createReport = async (req: Request, res: Response) => {
  try {
    const {date_generated, generated_by_user, type} = req.body

    // Definimos el tipo por defecto aquí para usarlo tanto en el servicio como en el nombre del archivo
    const finalType = type || 'STOCK'

    const result: any = await reporteService.createReport(
      {date_generated, generated_by_user},
      finalType,
    )

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=reporte-${finalType}-${Date.now()}.pdf`,
    )
    res.send(result.pdfData)
  } catch (error) {
    if (error instanceof Error) res.status(500).json(error.message)
  }
}

export const downloadReportById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string)

    const pdfBuffer: any = await reporteService.downloadReportPDF(id)

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=reporte-historico-${id}.pdf`,
    )
    res.send(pdfBuffer)
  } catch (error) {
    if (error instanceof Error) res.status(500).json(error.message)
  }
}

export const deleteReport = async (req: Request, res: Response) => {
  try {
    const result = await reporteService.deleteReport(
      parseInt(req.params.id as string),
    )
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) res.status(500).json(error.message)
  }
}
