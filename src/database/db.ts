import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST as string
const dbPassword = process.env.DB_PASSWORD as string
const dbPort = Number(process.env.DB_PORT) || 3306

// Verificamos si estamos en local para desactivar SSL
const isLocal = dbHost === 'localhost' || dbHost === '127.0.0.1'

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
  logging: false,
  port: dbPort,
  dialectOptions: isLocal
    ? {} // Si es local, no usamos opciones extra
    : {
        // Si es nube (TiDB), usamos la config segura
        ssl: {
          require: true,
          rejectUnauthorized: true,
          minVersion: 'TLSv1.2',
        },
      },
})

export default sequelize
