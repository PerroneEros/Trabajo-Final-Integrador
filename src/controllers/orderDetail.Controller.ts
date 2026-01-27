import {Request, Response} from 'express'
import * as DetallePedidoService from '../services/orderDetail.Service'
export const orderDetailID = async (req: Request, res: Response) => {
  try {
    const result = await DetallePedidoService.getOrderDetailsbyID(
      parseInt(req.params.id as string),
    )
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message)
    }
  }
}
export const modifyDetail = async (req: Request, res: Response) => {
  try {
    const result = await DetallePedidoService.modifyDetail(
      req.body.id_detail,
      req.body,
    )
    res.status(200).json({mesage: 'Detalle modificado', result})
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message)
    }
  }
}
export const createDetail = async (req: Request, res: Response) => {
  try {
    const result = await DetallePedidoService.createDetail(req.body)
    res.status(201).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message)
    }
  }
}
export const deleteDetail = async (req: Request, res: Response) => {
  try {
    const result = await DetallePedidoService.deleteDetail(
      parseInt(req.params.id as string),
    )
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message)
    }
  }
}
