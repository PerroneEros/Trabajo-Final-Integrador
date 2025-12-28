import app from './app'
import sequelize from './database/db'
import {createDatabaseIfNotExists} from './database/init'
import {seedDatabase} from './database/seeder'
import {initAssociations} from './models/associations'
const PORT = process.env.PORT || 3001

const main = async () => {
  try {
    await createDatabaseIfNotExists()
    await sequelize.authenticate()
    console.log('Conexión a la base de datos establecida.')
    initAssociations()
    await sequelize.sync({force: false, alter: true})
    console.log('Tablas sincronizadas.')
    await seedDatabase()
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`)
    })
  } catch (error) {
    console.error('No se pudo iniciar:', error)
  }
}

void main()
