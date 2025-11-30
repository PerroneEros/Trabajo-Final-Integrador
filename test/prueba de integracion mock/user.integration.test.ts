import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  beforeAll,
} from 'vitest'
const mockSendMail = vi.fn()
vi.doMock('nodemailer', () => {
  return {
    default: {
      createTransport: vi.fn(() => ({
        sendMail: mockSendMail,
      })),
    },
  }
})
let app
let request
beforeAll(async () => {
  const {default: appModule} = await import('./../../src/app')
  const {default: supertest} = await import('supertest')
  app = appModule
  request = supertest(app)
})
import mockUser from '../../src/mock/userMock.json'

beforeEach(() => {
  mockSendMail.mockClear()
})
afterEach(() => {
  vi.clearAllMocks()
})

describe('Pruebas de integración para Usuarios (Mock)', () => {
  describe('POST /api/users/register', () => {
    it('Debería registrar un nuevo usuario con éxito', async () => {
      const newUser = {
        id_user: 12,
        name: 'Usuario Prueba',
        email: 'prueba@test.com',
        password_hash: 'password123', 
        id_rol: 1,
      }

      const response = await request.post('/api/users/register').send(newUser)

      expect(response.status).toBe(201)
      expect(response.body.message).toBe('Usuario registrado con éxito')
      expect(response.body.user).toEqual(
        expect.objectContaining({
          name: 'Usuario Prueba',
          email: 'prueba@test.com',
        }),
      )
    })

    it('Debería retornar un error si el email ya existe', async () => {
      const userExisting = mockUser[0]
      const response = await request
        .post('/api/users/register')
        .send(userExisting)

      expect(response.status).toBe(400)
      expect(response.body.message).toBe('El correo electrónico ya está en uso')
    })
  })

  describe('POST /api/users/login', () => {
    it('Debería iniciar sesión con credenciales válidas', async () => {
      const userExisting = mockUser[11]
      const password = 'password123'
      const response = await request.post('/api/users/login').send({
        email: userExisting.email,
        password,
      })

      expect(response.status).toBe(200)
      expect(response.body.message).toBe('Login exitoso')
      expect(response.body.username).toBe(userExisting.name)
    })

    it('Debería retornar un error con credenciales inválidas', async () => {
      const response = await request.post('/api/users/login').send({
        email: 'noexiste@test.com',
        password: 'passwordincorrecto',
      })

      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Credenciales inválidas')
    })
  })
  describe('POST /api/users/recovery', () => {
    it('deberia mandar un mail para restablecer la contraseña', async () => {
      const mock = mockUser[0]
      const email = mock.email
      const response = await request
        .post('/api/users/recovery')
        .send({email: email})
      console.log(response.error)
      expect(mockSendMail).toHaveBeenCalledOnce()
      expect(mockSendMail).toHaveBeenCalledWith({
        from: '"Ecommerce" <no-reply@agro.com>',
        to: email,
        subject: 'restablecer contraseña',
        html: '<h1>contraseña restablecida a contraRestaurar</h1>',
      })
      expect(response.status).toBe(200)
    })
  })
  describe('Post /api/users/delete', () => {
    it('deberia eliminar el usuario con email y contraseña', async () => {
      const userDelete = {...mockUser[11]}
      const password = 'password123'
      const response = await request.delete('/api/users/delete').send({
        email: userDelete.email,
        password,
      })
      expect(response.status).toBe(200)
      expect(response.body.message).toBe('Usuario eliminado')
    })
  })
})
