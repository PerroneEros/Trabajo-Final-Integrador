interface ProductAttributes {
  id_product: number
  name: string
  description: string | null
  price: number
  stock: number
  category: string
  image: string
  create: string //indica la fecha de cuando fue creado
}
export default ProductAttributes
// agregar categoria: string
