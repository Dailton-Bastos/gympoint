import * as SMTPTransport from 'nodemailer/lib/smtp-transport'

export const mailConfig: SMTPTransport.Options = {
  host: process.env.MAIL_HOST,
  port: 2525,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  from: 'Equipe GymPoint <noreplay@gympoint.com>',
}
