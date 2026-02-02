import Order from '../models/order'
import User from '../models/user'
import {transporter} from '../utils/mailer'

export const orders = async () => {
  const order = await Order.findAll()
  return order
}

export const orderID = async (id: number) => {
  const order = await Order.findByPk(id)
  if (!order) {
    throw new Error('Pedido no encontrado')
  }
  return order
}

export const createOrder = async (pedidoData: any) => {
  try {
    const newOrder = await Order.create(pedidoData)

    User.findByPk(pedidoData.id_user)
      .then(user => {
        if (user && user.email) {
          transporter
            .sendMail({
              from: `"Agro-Insumos Ventas" <${process.env.EMAIL_USER}>`,
              to: user.email,
              subject: `Confirmación de Pedido #${newOrder.id_order}`,
              html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                        <h2 style="color: #4CAF50;">¡Gracias por tu compra! 🚜</h2>
                        <p>Hola <strong>${user.name}</strong>, hemos recibido tu pedido correctamente.</p>
                        
                        <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0;">
                            <p><strong>Nro de Orden:</strong> ${newOrder.id_order}</p>
                            <p><strong>Total:</strong> $${newOrder.total}</p>
                        </div>
                        
                        <p>Te avisaremos cuando el estado cambie.</p>
                    </div>
                `,
            })
            .catch(err => console.error('Error enviando mail de compra:', err))
        }
      })
      .catch(err => console.error('Error buscando usuario para mail:', err))

    return newOrder
  } catch (error) {
    console.error('Error al crear la orden en DB:', error)
    throw new Error('No se pudo crear la orden en la base de datos.')
  }
}

export const deleteOrder = async (id: number) => {
  const order = await orderID(id)
  await order.destroy()
  return {message: 'Pedido eliminado con exito'}
}

export const modifyOrder = async (id: number, pedidoData: any) => {
  const order = await orderID(id)
  await order.update(pedidoData)
  return order
}
