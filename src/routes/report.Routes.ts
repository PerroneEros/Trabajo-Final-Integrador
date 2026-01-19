import {Router} from 'express'
import {
  getReports,
  getReportID,
  createReport,
  deleteReport,
  downloadReportById,
} from '../controllers/report.Controller'

const router = Router()

router.get('/', getReports)
router.get('/:id', getReportID)
router.get('/:id/download', downloadReportById)
router.post('/', createReport)
router.delete('/:id', deleteReport)

export default router
