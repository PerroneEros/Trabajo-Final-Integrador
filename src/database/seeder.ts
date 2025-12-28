import User from '../models/user'
import Product from '../models/product'
import Order from '../models/order'
import OrderDetail from '../models/orderDetail'
import Report from '../models/report'
import usersData from '../mock/userMock.json'
import productsData from '../mock/productMock.json'
import ordersData from '../mock/orderMock.json'
import detailsData from '../mock/orderDetailMock.json'
import reportsData from '../mock/reportMock.json'

const parseDateDDMMYYYY = (dateString: string): Date => {
  if (!dateString) return new Date()
  const [day, month, year] = dateString.split('/')
  return new Date(Number(year), Number(month) - 1, Number(day))
}

export const seedDatabase = async () => {
  try {
    const usersCount = await User.count()
    if (usersCount > 0) {
      console.log('🌱 La base de datos ya tiene datos. Saltando seeding...')
      return
    }

    console.log('🌱 Iniciando carga masiva de mocks...')

    const usersToCreate = usersData.map(u => ({
      id_user: u.id_user,
      name: u.name,
      email: u.email,
      password_hash: u.password_hash,
      rol: u.rol,
      image: u.image,
      username: u.username,
      createdAt: new Date(u.create),
      updatedAt: new Date(u.create),
    }))

    await User.bulkCreate(usersToCreate)
    console.log(`✅ ${usersToCreate.length} Usuarios creados.`)

    const productsToCreate = productsData.map(p => ({
      id_product: p.id_product,
      name: p.name,
      description: p.description,
      category: p.category,
      price: p.price,
      stock: p.stock,
      image: p.image,
      createdAt: new Date(p.create),
      updatedAt: new Date(p.create),
    }))

    await Product.bulkCreate(productsToCreate)
    console.log(`✅ ${productsToCreate.length} Productos creados.`)

    const userMap = new Map<string, number>()
    usersData.forEach(u => userMap.set(u.username, u.id_user))

    const ordersToCreate = ordersData.map(o => {
      const userIdReal = userMap.get(o.id_user)

      if (!userIdReal) {
        throw new Error(
          `Usuario ${o.id_user} no encontrado para la orden ${o.id_order}`,
        )
      }

      return {
        id_order: o.id_order,
        id_user: userIdReal,
        date: parseDateDDMMYYYY(o.date),
        state: o.state,
        total: o.total,
        createdAt: parseDateDDMMYYYY(o.date),
      }
    })

    await Order.bulkCreate(ordersToCreate)
    console.log(`✅ ${ordersToCreate.length} Órdenes creadas.`)

    await OrderDetail.bulkCreate(detailsData)
    console.log(`✅ ${detailsData.length} Detalles de orden creados.`)

    const reportsToCreate = reportsData.map(r => ({
      id_report: r.id_report,
      generated_by_user: r.generated_by_user,
      createdAt: new Date(r.date_generated),
      updatedAt: new Date(r.date_generated),
    }))

    await Report.bulkCreate(reportsToCreate)
    console.log(`✅ ${reportsToCreate.length} Reportes creados.`)

    console.log('🚀 Carga de datos mockeados finalizada con éxito!')
  } catch (error) {
    console.error('❌ Error en el seeding:', error)
  }
}
