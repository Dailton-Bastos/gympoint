import { mailConfig } from '@/config/mail'
import nodemailer from 'nodemailer'

type Params = {
  to: string
  subject: string
  body: string
}

export const sendMail = async ({ to, subject, body }: Params) => {
  const transport = nodemailer.createTransport({ ...mailConfig })

  try {
    await transport.sendMail({
      from: mailConfig.from,
      to,
      subject,
      html: body,
    })
  } catch {
    return null
  }
}
