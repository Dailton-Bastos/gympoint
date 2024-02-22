import ConfirmationResetPassword from '@/components/emails/ConfirmationResetPassword'
import ResetPassword from '@/components/emails/ResetPassword'
import VerificationEmail from '@/components/emails/VerificationEmail'
import { sendMail } from '@/lib/mail'
import { render } from '@react-email/render'

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL

export const sendPasswordResetEmail = async ({
  email,
  token,
  userName,
}: {
  email: string
  token: string
  userName: string | null
}) => {
  const resetLink = `${DOMAIN}/auth/new-password?token=${token}`

  await sendMail({
    to: email,
    subject: 'Recupere sua senha',
    body: render(ResetPassword({ resetLink, email, userName })),
  })
}

export const sendConfirmationPasswordResetEmail = async ({
  email,
  userName,
}: {
  email: string
  userName: string | null
}) => {
  await sendMail({
    to: email,
    subject: 'Alteração de senha',
    body: render(ConfirmationResetPassword({ email, userName })),
  })
}

export const sendVerificationEmail = async ({
  email,
  userName,
  token,
}: {
  email: string
  userName: string
  token: string
}) => {
  await sendMail({
    to: email,
    subject: 'Confirme seu e-mail',
    body: render(VerificationEmail({ email, userName, token })),
  })
}
