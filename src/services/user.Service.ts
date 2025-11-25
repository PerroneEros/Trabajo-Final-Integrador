import User from '../models/user'
import data from '../mock/userMock.json'
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const transport = nodemailer.createTransport({
  host: process.env.Email_host,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})
// Función para el REGISTRO
export const register = async (userData: User) => {
  // 1. Verificar si el email ya existe
  const existingUser = await data.find(u => u.email === userData.email)
  if (existingUser) {
    throw new Error('El correo electrónico ya está en uso')
  }
  const newUser = await new User(userData)
  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash(newUser.password_hash, salt)
  newUser.password_hash = hashed
  data.push(newUser)
  return newUser
}

// Función para el LOGIN
export const login = async (email: string, password_raw: string) => {
  const user = await data.find(u => u.email === email)

  if (!user) {
    throw new Error('Credenciales inválidas')
  }
  const isMatch = await bcrypt.compare(password_raw, user.password_hash)
  if (!isMatch) {
    throw new Error('Contra invalida')
  }
  const payload = {
    id: user.id_user,
    email: user.email,
    rol: user.rol,
    username: user.username,
  }
  const name = user.name
  const secret = process.env.JWT_SECRET as string
  const token = jwt.sign(payload, secret, {expiresIn: '1h'})

  return {name, token}
}
export const eliminate = async (email: string, password: string) => {
  const user = await data.find(u => u.email === email)
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) {
      throw new Error('Contra invalida')
    }
    const userIN = data.findIndex(u => u.email === email)
    if (userIN >= 0) data.splice(userIN, 1)
    return {message: 'Usuario eliminado'}
  }
  throw new Error('Credenciales invalidas')
}

//El login se hace con email y password_raw.
export const recoveryPassword = async (email: string) => {
  const user = await data.find(d => d.email === email)
  if (!user) {
    throw new Error('El email no esta asociado con una cuenta')
  }
  try {
    const password = 'contraRestaurar'
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    user.password_hash = hashed
    // cambiar a una funcion que pase una contraseña
    await transport.sendMail({
      from: '"Ecommerce" <no-reply@agro.com>',
      to: email,
      subject: 'restablecer contraseña',
      html: `<h1>contraseña restablecida a ${password}</h1>`,
    })
    return {success: true}
  } catch (error) {
    console.error('Error al enviar email:', error)
    return {success: false, error}
  }
}

export const changePassword = async (
  id: number,
  currentPassword: string,
  newPassword: string,
) => {
  const userIndex: number = data.findIndex(u => u.id_user === id)
  if (userIndex === -1) {
    throw new Error('Usuario no encontrado')
  }

  const user = data[userIndex]
  if (!user) throw new Error('Usuario no encontrado')

  // Verifica que la contraseña actual coincida.
  const isMatch = await bcrypt.compare(currentPassword, user.password_hash)
  if (!isMatch) {
    throw new Error('Contraseña actual incorrecta')
  }

  // Hashea la nueva contraseña y la actualiza si las contraseñas coinciden.
  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash(newPassword, salt)
  user.password_hash = hashed

  return {message: 'Contraseña actualizada'}
}
