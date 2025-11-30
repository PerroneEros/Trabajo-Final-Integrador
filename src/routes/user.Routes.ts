import {Router} from 'express'
import {
  registerUser,
  loginUser,
  recoveryPassword,
  deleteUser,
  changePassword,
} from '../controllers/user.Controller'
import {authMiddleware} from '../middlewares/auth.Middleware'

const router = Router()

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser)

// Ruta para iniciar sesion
router.post('/login', loginUser)
router.post('/recovery', recoveryPassword)
router.delete('/delete', deleteUser)

// Ruta para cambiar contraseña
router.put('/user/:id', authMiddleware, changePassword)
export default router
