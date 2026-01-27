import {Request, Response} from 'express'
import * as productService from '../services/product.Service'

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productService.getAllProducts()
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({message: error.message})
    }
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(
      parseInt(req.params.id as string),
    )
    res.status(200).json(product)
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({message: error.message})
    }
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const imagePath = req.file ? req.file.path : ''
    const productData = {
      ...req.body,
      image: imagePath,
    }
    const newProduct = await productService.createProduct(productData)
    res
      .status(201)
      .json({message: 'Producto creado con éxito', product: newProduct})
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({message: error.message})
    }
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await productService.updateProduct(
      parseInt(req.params.id as string),
      req.body,
    )
    res.status(200).json({
      message: 'Producto actualizado con éxito',
      product: updatedProduct,
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({message: error.message})
    }
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await productService.deleteProduct(parseInt(req.params.id as string))
    res.status(200).json({message: 'Producto eliminado con éxito'})
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({message: error.message})
    }
  }
}
