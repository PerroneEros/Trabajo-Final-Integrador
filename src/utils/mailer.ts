import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const transporter = nodemailer.createTransport({
  host: process.env.Email_host,
  port: 465, // Puerto de GMAIL
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

transporter
  .verify()
  .then(() => {
    console.log('📧 Conectado al servidor de GMAIL')
  })
  .catch(error => {
    console.error('❌ Error conectando a Gmail:', error)
  })
