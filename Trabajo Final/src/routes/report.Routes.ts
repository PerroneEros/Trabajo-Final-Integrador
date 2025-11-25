import {Router} from 'express'
import {
  getReports,
  getReportID,
  createReport,
  deleteReport,
} from '../controllers/report.Controller'
const router = Router()
router.get('/', getReports)
router.get('/:id', getReportID)
router.post('/', createReport)
router.delete('/:id', deleteReport)
export default router
