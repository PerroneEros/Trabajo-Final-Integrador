import {Request, Response} from 'express'
import * as reporteService from '../services/report.Service'
export const getReports = async (req: Request, res: Response) => {
  try {
    const result = await reporteService.reports()
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message)
    }
  }
}
export const getReportID = async (req: Request, res: Response) => {
  try {
    const report = await reporteService.findReport(
      parseInt(req.params.id as string),
    )
    res.status(200).json(report)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message)
    }
  }
}
export const createReport = async (req: Request, res: Response) => {
  try {
    const report = await reporteService.createReport(req.body)
    res.status(201).json({message: 'reporte generado con exito', report})
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message)
    }
  }
}
export const deleteReport = async (req: Request, res: Response) => {
  try {
    const result = await reporteService.deleteReport(
      parseInt(req.params.id as string),
    )
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message)
    }
  }
}
