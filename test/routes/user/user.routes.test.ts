import {describe, it, expect} from 'vitest'
import {request} from '../../utils/request'

describe('Users API', () => {
  it('POST /api/users/register -> 201 registrar nuevo usuario', async () => {
    const registro = {
      id_usuario: 20,
      nombre: 'Usuario Test',
      email: 'emailtest@example.com',
      password_hash: 'contraseñahash',
    }
    const res = await request.post('/api/users/register').send(registro)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('message')
    expect(res.body.user).toHaveProperty('email')
    expect(res.body.user.email).toBe(registro.email)
  })

  it('POST /api/users/login -> 401 credenciales invalidas', async () => {
    const res = await request.post('/api/users/login').send({
      email: 'emailprueba@email.com',
      password: 'incorrecta',
    })
    expect(res.status).toBe(401)
  })
})
