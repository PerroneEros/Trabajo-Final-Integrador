import supertest from 'supertest'
import app from '../../src/app'
import jwt from 'jsonwebtoken'

// Aseguramos una secret para pruebas
process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret'

export const token = jwt.sign(
  {id_user: 1, email: 'gvanhaeften0@vimeo.com'},
  process.env.JWT_SECRET as string,
)

export const request = supertest(app)

export default request
