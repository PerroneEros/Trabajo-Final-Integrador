import Product from '../models/product'
import cloudinary from '../utils/cloudinary'
import fs from 'fs-extra'

export const getAllProducts = async () => {
  const product = await Product.findAll()
  return product
}

export const getProductById = async (id: number) => {
  const product = await Product.findByPk(id)
  if (!product) {
    throw new Error('Producto no encontrado')
  }
  return product
}

// Crear
export const createProduct = async (productData: any) => {
  const {name, description, price, stock, category, image} = productData
  let imageUrl = ''
  if (image && image !== '') {
    try {
      const result = await cloudinary.uploader.upload(image)
      imageUrl = result.secure_url
      await fs.unlink(image)
    } catch (error) {
      console.error('Error subiendo imagen a Cloudinary:', error)
    }
  }
  const newProduct = await Product.create({
    name,
    description,
    price,
    stock,
    category,
    image: imageUrl,
  })
  return newProduct
}

// Actualizar
export const updateProduct = async (id: number, productData: Product) => {
  const product = await getProductById(id)
  let imageUrl = product.image
  if (productData.image && productData.image !== '') {
    try {
      const result = await cloudinary.uploader.upload(productData.image)
      imageUrl = result.secure_url
    } catch (error) {
      console.error('Error actualizando imagen:', error)
    }
  }
  await product.update({
    name: productData.name,
    description: productData.description,
    category: productData.category,
    price: productData.price,
    stock: productData.stock,
    image: imageUrl,
  })
  await product.reload()
  return product
}

// Eliminar
export const deleteProduct = async (id: number) => {
  const product = await getProductById(id)
  await product?.destroy()
  return {message: 'Producto eliminado correctamente'}
}
