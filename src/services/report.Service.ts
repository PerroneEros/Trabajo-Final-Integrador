import Report from '../models/report'
import Product from '../models/product'
import Order from '../models/order'
import PDFDocument from 'pdfkit'

// Función auxiliar para dibujar el PDF
const buildPDFDocument = (
  title: string,
  data: any[],
  columns: string[],
  resolve: any,
  reject: any,
) => {
  const doc = new PDFDocument()
  let buffers: any[] = []
  doc.on('data', buffers.push.bind(buffers))
  doc.on('end', () => {
    const pdfData = Buffer.concat(buffers)
    resolve(pdfData)
  })
  doc.on('error', reject)

  // Encabezado
  doc.fontSize(20).text(title, {align: 'center'})
  doc.moveDown()
  doc
    .fontSize(10)
    .text(`Fecha de emisión: ${new Date().toLocaleDateString()}`, {
      align: 'right',
    })
  doc.moveDown()

  // Tabla
  let y = doc.y
  doc.font('Helvetica-Bold')
  let x = 50
  columns.forEach(col => {
    doc.text(col, x, y)
    x += 100
  })

  doc.moveDown()
  doc.font('Helvetica')

  // Datos
  data.forEach(item => {
    y = doc.y + 15
    if (y > 700) {
      doc.addPage()
      y = 50
    }

    x = 50
    Object.values(item).forEach((val: any) => {
      const text = String(val).substring(0, 15)
      doc.text(text, x, y)
      x += 100
    })
  })
  doc.end()
}

export const reports = async () => {
  return await Report.findAll({order: [['createdAt', 'DESC']]})
}

// Crear nuevo reporte
export const createReport = async (userData: any, type: string) => {
  let dataToSave: any[] = []

  // Obtener datos actuales
  if (type === 'STOCK') {
    const products = await Product.findAll()
    dataToSave = products.map(p => ({
      name: p.name,
      category: p.category,
      stock: p.stock.toString(),
      price: `$${p.price}`,
    }))
  } else if (type === 'VENTAS') {
    const orders = await Order.findAll({limit: 100, order: [['date', 'DESC']]})
    dataToSave = orders.map(o => ({
      id: o.id_order,
      state: o.state,
      total: `$${o.total}`,
      date: new Date(o.date).toLocaleDateString(),
    }))
  }

  // Guardar en BD
  const newReport = await Report.create({
    generated_by_user: userData.generated_by_user,
    type: type,
    report_data: dataToSave,
  })

  // Generar PDF
  return new Promise((resolve, reject) => {
    const title = type === 'STOCK' ? 'Reporte de Stock' : 'Reporte de Ventas'
    const cols =
      type === 'STOCK'
        ? ['Producto', 'Categoría', 'Stock', 'Precio']
        : ['ID Pedido', 'Estado', 'Total', 'Fecha']

    buildPDFDocument(
      title,
      dataToSave,
      cols,
      (pdfData: Buffer) => {
        resolve({newReport, pdfData})
      },
      reject,
    )
  })
}

// DESCARGAR HISTORIAL
export const downloadReportPDF = async (id: number) => {
  const report = await Report.findByPk(id)
  if (!report) throw new Error('Reporte no encontrado')

  const data = report.report_data || []
  const type = report.type || 'DESCONOCIDO'

  return new Promise((resolve, reject) => {
    const title = type === 'STOCK' ? `Histórico: Stock` : `Histórico: Ventas`
    const cols =
      type === 'STOCK'
        ? ['Producto', 'Categoría', 'Stock', 'Precio']
        : ['ID Pedido', 'Estado', 'Total', 'Fecha']

    if (data.length === 0) {
      buildPDFDocument(
        'Reporte Sin Datos',
        [{msg: 'Datos no disponibles'}],
        ['Error'],
        resolve,
        reject,
      )
    } else {
      buildPDFDocument(title, data, cols, resolve, reject)
    }
  })
}

export const findReport = async (id: number) => {
  const report = await Report.findByPk(id)
  if (!report) throw new Error('Reporte no encontrado')
  return report
}

export const deleteReport = async (id: number) => {
  const report = await findReport(id)
  await report.destroy()
  return {message: 'Reporte Eliminado'}
}
