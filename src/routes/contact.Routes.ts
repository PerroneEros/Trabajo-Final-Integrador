import {Router} from 'express'
import {sendContactEmail} from '../controllers/contact.Controller'

const router = Router()

// Ruta POST para recibir el formulario
router.post('/', sendContactEmail)

export default router
