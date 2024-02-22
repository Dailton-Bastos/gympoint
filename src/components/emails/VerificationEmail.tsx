import { LayoutEmail } from '@/components/emails/Layout'
import * as styles from '@/components/emails/styles'
import { Section, Heading, Text, Link } from '@react-email/components'

type Props = {
  email: string
  userName: string
  token: string
}

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL

const VerificationEmail = ({ email, userName, token }: Props) => {
  const confirmEmailLink = `${DOMAIN}/auth/new-verification?token=${token}`
  return (
    <LayoutEmail preview='Boas-vindas ao GymPoint'>
      <Section>
        <Heading style={styles.heading}>Olá {userName || email}</Heading>

        <Text style={styles.link}>
          👉
          <Link href={confirmEmailLink} style={styles.link}>
            Clique aqui para confirmar sua conta
          </Link>
          👈
        </Text>

        <Text style={styles.paragraph}>
          Se você não solicitou essa ação, poderá ignorar com segurança este
          email. Outra pessoa pode ter digitado seu endereço de email por
          engano.
        </Text>
      </Section>
    </LayoutEmail>
  )
}

export default VerificationEmail
