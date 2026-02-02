import { Request, Response } from 'express';
import { transporter } from '../utils/mailer';

export const sendContactEmail = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, email, consulta } = req.body;

    // Validamos que lleguen los datos
    if (!nombre || !email || !consulta) {
      return res.status(400).json({ message: 'Faltan datos requeridos.' });
    }

    // Enviamos el correo a la cuenta de la empresa
    await transporter.sendMail({
      from: `"Formulario de Contacto" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email, // Al dar "Responder", responderás al cliente
      subject: `Nueva Consulta de: ${nombre} ${apellido}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #2c3e50;">📩 Nueva Consulta Recibida</h2>
            <p>Un usuario ha completado el formulario de contacto de la web.</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; margin-top: 20px;">
                <p><strong>Nombre:</strong> ${nombre} ${apellido || ''}</p>
                <p><strong>Email del Cliente:</strong> ${email}</p>
                <hr style="border: 0; border-top: 1px solid #ccc;">
                <p><strong>Consulta:</strong></p>
                <p style="font-size: 1.1em; color: #555;">${consulta}</p>
            </div>
        </div>
      `
    });

    res.status(200).json({ message: 'Consulta enviada con éxito' });

  } catch (error) {
    console.error('Error enviando contacto:', error);
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
};