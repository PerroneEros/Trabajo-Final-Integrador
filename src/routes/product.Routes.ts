import {Router} from 'express'
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.Controller'
import {authMiddleware} from '../middlewares/auth.Middleware'

const router = Router()

// Rutas publicas
router.get('/', getAllProducts)
router.get('/:id', getProductById)

// Rutas protegidas 
router.post('/', authMiddleware, createProduct)
router.put('/:id', authMiddleware, updateProduct)
router.delete('/:id', authMiddleware, deleteProduct)

export default router
