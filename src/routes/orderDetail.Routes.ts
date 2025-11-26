import {Router} from 'express'
import {
  orderDetailID,
  modifyDetail,
  createDetail,
  deleteDetail,
} from '../controllers/orderDetail.Controller'
const router = Router()
router.get('/:id', orderDetailID)
router.put('/', modifyDetail)
router.post('/', createDetail)
router.delete('/:id', deleteDetail)
export default router
