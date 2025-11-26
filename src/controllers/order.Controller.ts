import {Request, Response} from 'express'
import * as PedidoService from '../services/order.Service'
export const getOrders = async (req: Request, res: Response) => {
  try {
    const result = await PedidoService.orders()
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message)
    }
  }
}
export const orderID = async (req: Request, res: Response) => {
  try {
    const result = await PedidoService.orderID(
      parseInt(req.params.id as string),
    )
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message)
    }
  }
}
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const result = await PedidoService.deleteOrder(
      parseInt(req.params.id as string),
    )
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message)
    }
  }
}

export const createOrder = async (req: Request, res: Response) => {
  try {
    const result = await PedidoService.createOrder(req.body)
    res.status(201).json({mesage: 'Pedido creado con exito', result})
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message)
    }
  }
}
export const modifyOrder = async (req: Request, res: Response) => {
  try {
    const result = await PedidoService.modifyOrder(req.body.id_order, req.body)
    res.status(200).json({message: 'pedido actualizado', result})
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message)
    }
  }
}
