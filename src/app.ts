import express, {Application, Request, Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

// Rutas
import userRoutes from './routes/user.Routes'
import productRoutes from './routes/product.Routes'
import reportRoute from './routes/report.Routes'
import orderRoutes from './routes/order.Routes'
import orderDetailRoutes from './routes/orderDetail.Routes'

dotenv.config()
const app: Application = express()

// Configuración de archivos estáticos (Lo que agregó tu equipo)
app.use('/public', express.static(path.join(__dirname, '../public')))

// Middlewares Globales (Solo una vez)
app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res
    .status(200)
    .json({message: 'API de Agro-Insumos funcionando correctamente'})
})

// Rutas de la API
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/report', reportRoute)
app.use('/api/order', orderRoutes)
app.use('/api/detail', orderDetailRoutes)

export default app
