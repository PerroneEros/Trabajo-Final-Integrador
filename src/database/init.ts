import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

export const createDatabaseIfNotExists = async () => {
  const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT} = process.env

  try {
    const connection = await mysql.createConnection({
      host: DB_HOST as string,
      user: DB_USER as string,
      password: DB_PASSWORD as string,
      port: Number(DB_PORT) || 3306,
      ssl: {
        rejectUnauthorized: true, // TiDB requiere esto como mínimo
        minVersion: 'TLSv1.2',
      },
    })

    // Usamos comillas invertidas para proteger el nombre de la DB
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`)

    console.log(
      `✅ Base de datos '${DB_NAME}' verificada/creada correctamente.`,
    )

    await connection.end()
  } catch (error) {
    console.error('❌ Error al intentar crear la base de datos:', error)
    throw new Error('Error al intentar crear la base de datos')
  }
}
