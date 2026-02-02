import {Router} from 'express'
import multer from 'multer' // <--- Importamos multer
import path from 'path'
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

// --- CONFIGURACIÓN DE MULTER ---
// Esto define dónde se guardarán temporalmente las imágenes antes de subirse a Cloudinary
const upload = multer({
  dest: 'uploads/', // Carpeta temporal
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      // Le damos un nombre único al archivo para no sobreescribir
      cb(null, Date.now() + path.extname(file.originalname))
    },
  }),
})

// --- RUTAS PÚBLICAS ---

// Agregamos el middleware 'upload.single("image")'
// "image" debe ser el nombre del campo (key) en el Form-Data del frontend
router.post('/register', upload.single('image'), registerUser)

router.post('/login', loginUser)
router.post('/recovery', recoveryPassword)
router.delete('/delete', deleteUser)

// --- RUTAS PROTEGIDAS (Requieren Token) ---

// Para actualizar usuario también podríamos recibir una imagen nueva
router.put('/:id', authMiddleware, upload.single('image'), updateUser)

router.put('/user/:id', authMiddleware, changePassword)
router.get('/', authMiddleware, getAllUsers)
router.delete('/:id', authMiddleware, deleteUserId)

export default router
