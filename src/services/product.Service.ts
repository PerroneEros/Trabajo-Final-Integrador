import Product from '../models/product'
import data from '../mock/productMock.json'

export const getAllProducts = async () => {
  return data
}

export const getProductById = async (id: number) => {
  const product = data.find(p => p.id_product === id)
  if (!product) {
    throw new Error('Producto no encontrado')
  }
  return product
}

// Crear
export const createProduct = async (productData: Product) => {
  const newProduct = await new Product(productData)
  data.push(newProduct)
  return newProduct
}

// Actualizar 
export const updateProduct = async (id: number, productData: Product) => {
  const producto = await getProductById(id) 
  if (producto) {
    producto.name = productData.name
    producto.description = productData.description
    producto.price = productData.price
    producto.stock = productData.stock
    producto.category = productData.category
  }
  return producto
}

// Eliminar
export const deleteProduct = async (id: number) => {
  const product = await getProductById(id) 
  if (product) {
    const a = data.findIndex(d => d.id_product === id)
    if (a >= 0) data.splice(a, 1)
    return {message: 'Producto eliminado correctamente'}
  }
  return {message: 'Producto no encontrado'}
}
