import { LayoutEmail } from '@/components/emails/Layout'
import * as styles from '@/components/emails/styles'
import { Section, Heading, Text, Link } from '@react-email/components'

type Props = {
  email: string
  userName: string | null
}

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL

const ConfirmationResetPassword = ({ email, userName = null }: Props) => {
  return (
    <LayoutEmail preview='Suas informações de conta foram alteradas'>
      <Section>
        <Heading style={styles.heading}>Olá {userName || email}</Heading>

        <Text style={styles.link}>
          🚨 Verificamos uma alteração de senha da sua conta. 🚨
        </Text>

        <Text style={styles.paragraph}>
          Este e-mail foi enviado porque alguém redefiniu a senha da sua conta
          GymPoint, caso não tenha sido você, aconselhamos{' '}
          <Link style={styles.link} href={`${DOMAIN}/auth/forgot`}>
            redefinir sua senha.
          </Link>
        </Text>
      </Section>
    </LayoutEmail>
  )
}

export default ConfirmationResetPassword
