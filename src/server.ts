import app from './app'
const PORT = process.env.PORT || 3001

const main = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`)
    })
  } catch (error) {
    console.error('No se pudo iniciar:', error)
  }
}

main()
