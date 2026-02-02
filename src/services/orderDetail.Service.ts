import OrderDetail from '../models/orderDetail'
import Product from '../models/product'
import sequelize from '../database/db' 

export const orderDetailID = async (id: number) => {
  const detail = await OrderDetail.findByPk(id)
  if (!detail) {
    throw new Error('Detalle no encontrado')
  }
  return detail
}

export const getOrderDetailsbyID = async (id: number) => {
  const details = await OrderDetail.findAll({
    where: {id_order: id},
  })
  return details
}

export const modifyDetail = async (id: number, DetailData: OrderDetail) => {
  const detail = await orderDetailID(id)
  await detail.update(DetailData)
  return detail
}

export const deleteDetail = async (id: number) => {
  const detail = await orderDetailID(id)
  await detail.destroy()
  return {message: 'Detalle de orden eliminado'}
}

export const createDetail = async (DetailData: any) => {
  const t = await sequelize.transaction()

  try {
    // 1. Buscamos el producto
    const product = await Product.findByPk(DetailData.id_product, {
      transaction: t,
    })

    if (!product) {
      throw new Error(`Producto ${DetailData.id_product} no encontrado`)
    }

    // 2. Validamos Stock
    if (product.stock < DetailData.amount) {
      throw new Error(
        `Stock insuficiente para ${product.name}. Disponible: ${product.stock}`,
      )
    }

    // 3. Descontamos Stock
    await product.update(
      {stock: product.stock - DetailData.amount},
      {transaction: t},
    )

    // 4. Creamos el Detalle
    const detail = await OrderDetail.create(DetailData, {transaction: t})

    // 5. Confirmamos
    await t.commit()
    return detail
  } catch (error) {
    await t.rollback()
    throw error
  }
}
