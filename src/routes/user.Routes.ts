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

// Ruta para Registrar un nuevo usuario
// POST /api/users/register
router.post('/register', registerUser)

// Ruta para Iniciar Sesión
// POST /api/users/login
router.post('/login', loginUser)
router.post('/recovery', recoveryPassword)
router.delete('/delete', deleteUser)

// Ruta para Cambiar Contraseña
/*Agregue `authMiddleware` para que sólo usuarios autenticados puedan cambiar contraseña.
El controlador usa el id del token para evitar que un usuario cambie la contraseña de otro.*/
router.put('/user/:id', authMiddleware, changePassword)
export default router
