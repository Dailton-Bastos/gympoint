import { sendMail } from '@/lib/mail'

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL

export const sendPasswordResetEmail = async ({
  email,
  token,
}: {
  email: string
  token: string
}) => {
  const resetLink = `${DOMAIN}/auth/new-password?token=${token}`

  await sendMail({
    to: email,
    subject: 'Resetar senha',
    body: `<p>Clique <a href=${resetLink}>aqui</a></p>`,
  })
}
