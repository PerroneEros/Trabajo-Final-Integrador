import {Router} from 'express'
import {
  getOrders,
  orderID,
  deleteOrder,
  createOrder,
  modifyOrder,
} from '../controllers/order.Controller'
const router = Router()
router.get('/', getOrders)
router.get('/:id', orderID)
router.delete('/:id', deleteOrder)
router.post('/', createOrder)
router.put('/', modifyOrder) 
export default router
