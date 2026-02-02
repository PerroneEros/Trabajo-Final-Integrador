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
import contactRoutes from './routes/contact.Routes'

dotenv.config()
const app: Application = express()

app.use('/public', express.static(path.join(__dirname, '../public')))

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
app.use('/api/contact', contactRoutes)

export default app
