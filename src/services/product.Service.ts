import Product from '../models/product'

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
export const createProduct = async (productData: Product) => {
  const newProduct = await Product.create(productData)
  return newProduct
}

// Actualizar
export const updateProduct = async (id: number, productData: Product) => {
  const product = await getProductById(id)
  await product.update(productData)
  return product
}

// Eliminar
export const deleteProduct = async (id: number) => {
  const product = await getProductById(id)
  await product?.destroy()
  return {message: 'Producto eliminado correctamente'}
}
