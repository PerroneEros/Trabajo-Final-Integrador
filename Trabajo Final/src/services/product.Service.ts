import Product from '../models/product'
import data from '../mock/productMock.json'
// Obtener todos los productos con paginación
export const getAllProducts = async () => {
  return data
}
// Obtener un producto por su ID
export const getProductById = async (id: number) => {
  const product = data.find(p => p.id_product === id)
  if (!product) {
    throw new Error('Producto no encontrado')
  }
  return product
}

// Crear un nuevo producto
export const createProduct = async (productData: Product) => {
  const newProduct = await new Product(productData)
  data.push(newProduct)
  return newProduct
}

// Actualizar un producto existente
export const updateProduct = async (id: number, productData: Product) => {
  const producto = await getProductById(id) // Reutilizamos la función para verificar si existe
  if (producto) {
    producto.name = productData.name
    producto.description = productData.description
    producto.price = productData.price
    producto.stock = productData.stock
    producto.category = productData.category
  }
  return producto
}

// Eliminar un producto
export const deleteProduct = async (id: number) => {
  const product = await getProductById(id) // Verificamos si existe
  if (product) {
    const a = data.findIndex(d => d.id_product === id)
    if (a >= 0) data.splice(a, 1)
    return {message: 'Producto eliminado correctamente'}
  }
  return {message: 'Producto no encontrado'}
}
