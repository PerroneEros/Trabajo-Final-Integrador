import {describe, it, expect, beforeAll} from 'vitest'
import * as userService from '../../src/services/user.Service'
import users from '../../src/mock/userMock.json'
import user from '../../src/models/user'
beforeAll(() => {
  // Aseguramos una secret para pruebas
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret'
})
describe('User Service', () => {
  it('register crea un usuario nuevo y evita duplicados', async () => {
    const user: any = {
      id_user: 13,
      name: 'UTest',
      email: 'usertest@email.com',
      password_hash: 'secret',
    }
    const created = await userService.register(user)
    expect(created).toHaveProperty('email')

    await expect(userService.register(user)).rejects.toThrow()
  })

  it('login valida credenciales existentes', async () => {
    // Usamos un user del mock (comparamos password_raw con password_hash)
    const userMock = users[11]
    const email = userMock.email
    const password = 'secret'
    const logged = await userService.login(email, password)
    expect(logged.name).toBe('UTest')
  })

  it('borrar elimina user por email+password', async () => {
    const user: user = {
      id_user: 9997,
      name: 'BDel',
      email: 'usereliminar@email.com',
      password_hash: 'contraseñaborrar',
    }
    await userService.register(user)
    const res = await userService.eliminate(user.email, user.password_hash)
    expect(res).toHaveProperty('message')
  })
})
