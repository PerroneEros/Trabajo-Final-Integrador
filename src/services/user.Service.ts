import User from '../models/user'
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {ForeignKeyConstraintError} from 'sequelize'
import cloudinary from '../utils/cloudinary'
import fs from 'fs-extra'
const transport = nodemailer.createTransport({
  host: process.env.Email_host,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const register = async (userData: any) => {
  const existingUser = await User.findOne({
    where: {email: userData.email},
  })
  if (existingUser) {
    throw new Error('El correo electrónico ya está en uso')
  }
  let imageUrl = ''
  if (userData.image && userData.image !== '') {
    try {
      const result = await cloudinary.uploader.upload(userData.image)
      imageUrl = result.secure_url
      await fs.unlink(userData.image)
    } catch (error) {
      console.error('Error subiendo imagen perfil:', error)
    }
  }
  if (
    userData.rol.toLocaleLowerCase() === 'vendedor' ||
    userData.rol.toLocaleLowerCase() === 'cliente'
  ) {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(userData.password_hash, salt)
    const newUser = await User.create({
      name: userData.name,
      email: userData.email,
      password_hash: hashed,
      rol: userData.rol,
      image: imageUrl,
      username: userData.username,
    })
    return newUser
  }
  throw new Error('Rol no aceptado')
}

// Función del LOGIN
export const login = async (email: string, password_raw: string) => {
  const user = await User.findOne({
    where: {email: email},
  })
  if (!user) {
    throw new Error('Credenciales inválidas')
  }
  const isMatch = await bcrypt.compare(password_raw, user.password_hash)
  if (!isMatch) {
    throw new Error('Credenciales invalidas')
  }
  const payload = {
    id: user.id_user,
    email: user.email,
    rol: user.rol,
    username: user.username,
  }
  const secret = process.env.JWT_SECRET as string
  const token = jwt.sign(payload, secret, {expiresIn: '1h'})

  return {
    id_user: user.id_user,
    username: user.username,
    name: user.name,
    email: user.email,
    rol: user.rol,
    image: user.image,
    token: token,
  }
}
export const eliminate = async (email: string, password: string) => {
  const user = await User.findOne({
    where: {email: email},
  })
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (isMatch) {
      try {
        await user.destroy()
        return {message: 'Usuario eliminado'}
      } catch (error: any) {
        if (
          error instanceof ForeignKeyConstraintError ||
          error.name === 'SequelizeForeignKeyConstraintError'
        ) {
          throw new Error(
            'No puedes eliminar tu cuenta porque tienes pedidos registrados.',
          )
        }
        throw error
      }
    }
  }
  throw new Error('Credenciales invalidas')
}

//Login  con "email y password_raw"
export const recoveryPassword = async (email: string) => {
  const user = await User.findOne({
    where: {email: email},
  })
  if (!user) {
    throw new Error('El email no esta asociado con una cuenta')
  }
  try {
    const password = 'contraRestaurar'
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    user.password_hash = hashed
    await user.save()
    await transport.sendMail({
      from: '"Ecommerce" <no-reply@agro.com>',
      to: email,
      subject: 'restablecer contraseña',
      html: `<h1>contraseña restablecida a ${password}</h1>`,
    })
    return {success: true}
  } catch (error) {
    console.error('Error al enviar email:', error)
    throw new Error('No se pudo enviar el correo. Intenta más tarde.')
  }
}

export const changePassword = async (
  id: number,
  currentPassword: string,
  newPassword: string,
) => {
  const user = await User.findByPk(id)
  if (!user) throw new Error('Credenciales invalidas')
  const isMatch = await bcrypt.compare(currentPassword, user.password_hash)
  if (!isMatch) {
    throw new Error('Credenciales invalidas')
  }

  // Verificacion - Validacion
  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash(newPassword, salt)
  user.password_hash = hashed
  await user.save()

  return {message: 'Contraseña actualizada'}
}
export const updateUser = async (id: number, userData: any) => {
  const user = await User.findByPk(id)
  if (!user) {
    throw new Error('Usuario no encontrado')
  }
  let imageUrl = user.image
  if (userData.image && userData.image !== '') {
    try {
      const result = await cloudinary.uploader.upload(userData.image)
      imageUrl = result.secure_url
      await fs.unlink(userData.image)
    } catch (error) {
      console.error('Error actualizando imagen:', error)
    }
  }
  await user.update({
    name: userData.name,
    email: userData.email,
    username: userData.username,
    image: imageUrl,
    rol: userData.rol || user.rol,
  })
  return user
}
export const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: {exclude: ['password_hash', 'token']},
  })
  return users
}
export const deleteUserId = async (id: number) => {
  const user = await User.findOne({
    where: {id_user: id},
  })
  if (user) {
    try {
      await user.destroy()
      return {message: 'Usuario eliminado'}
    } catch (error: any) {
      if (
        error instanceof ForeignKeyConstraintError ||
        error.name === 'SequelizeForeignKeyConstraintError'
      ) {
        throw new Error(
          'No puedes eliminar tu cuenta porque tienes pedidos registrados.',
        )
      }
      throw error
    }
  }
  throw new Error('Credenciales invalidas')
}
