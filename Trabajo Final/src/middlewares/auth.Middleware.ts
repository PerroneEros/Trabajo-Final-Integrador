import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user'

// Extendemos la interfaz de Request para poder añadir la propiedad 'user'
interface AuthRequest extends Request {
  user?: User | string | object
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  // 1. Obtener el token del header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // "Bearer TOKEN"

  if (!token) {
    return res
      .status(401)
      .json({message: 'Acceso denegado. No se proporcionó un token.'})
  }

  // 2. Verificar el token
  try {
    const secret = process.env.JWT_SECRET as string
    const decoded = jwt.verify(token, secret)
    req.user = decoded // Guardamos los datos del usuario en la request
    next() // El token es válido, continuamos a la ruta
  } catch (error) {
    if (error instanceof Error) {
      res.status(403).json({message: 'Token inválido o expirado.'})
    }
  }
}
