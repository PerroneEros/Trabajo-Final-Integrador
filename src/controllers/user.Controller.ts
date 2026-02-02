import {Request, Response} from 'express'
import * as userService from '../services/user.Service'

// Controlador para REGISTRO
export const registerUser = async (req: Request, res: Response) => {
  try {
    const file = (req as any).file
    const imagePath = file ? file.path : ''
    const userData = {
      ...req.body,
      image: imagePath,
    }
    const newUser = await userService.register(userData)
    res
      .status(201)
      .json({message: 'Usuario registrado con éxito', user: newUser})
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({message: error.message})
    }
  }
}

// Controlador para LOGIN
export const loginUser = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body
    const result = await userService.login(email, password)
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({message: error.message})
    }
  }
}

export const recoveryPassword = async (req: Request, res: Response) => {
  try {
    await userService.recoveryPassword(req.body.email)
    res.status(200).json({message: 'contraseña restablecida a contraRestaurar'})
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json(error.message)
    }
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.eliminate(
      req.body.email,
      req.body.password,
    )
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message)
    }
  }
}

export const changePassword = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const {currentPassword, newPassword} = req.body
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({message: 'Falta Contraseña actual o nueva contraseña'})
    }
    const result = await userService.changePassword(
      id,
      currentPassword,
      newPassword,
    )
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({message: error.message})
    }
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const file = (req as any).file
    const imagePath = file ? file.path : ''
    const data = {
      ...req.body,
      image: imagePath,
    }
    const result = await userService.updateUser(id, data)
    res.status(200).json({message: 'usuario actualizado', result})
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message)
    }
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers()
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({message: error.message})
    }
  }
}

export const deleteUserId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const result = await userService.deleteUserId(id)
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({message: error.message})
    }
  }
}
