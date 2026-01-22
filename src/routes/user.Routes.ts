import {Router} from 'express'
import {
  registerUser,
  loginUser,
  recoveryPassword,
  deleteUser,
  changePassword,
  updateUser,
  getAllUsers,
  deleteUserId,
} from '../controllers/user.Controller'
import {authMiddleware} from '../middlewares/auth.Middleware'

const router = Router()

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser)

// Ruta para iniciar sesion
router.post('/login', loginUser)
router.post('/recovery', recoveryPassword)
router.delete('/delete', deleteUser)
router.delete('/:id', authMiddleware, deleteUserId)
// Ruta para cambiar contraseña
router.put('/password/:id', authMiddleware, changePassword)
//Ruta para actualizar usuario
router.put('/:id', updateUser)
router.get('/', authMiddleware, getAllUsers)
export default router
