import { LayoutEmail } from '@/components/emails/Layout'
import * as styles from '@/components/emails/styles'
import { Section, Heading, Text, Link } from '@react-email/components'

type Props = {
  resetLink: string
  email: string
  userName: string | null
}

const ResetPassword = ({ resetLink, email, userName = null }: Props) => {
  return (
    <LayoutEmail preview='Recuperação de senha'>
      <Section>
        <Heading style={styles.heading}>Olá {userName || email}</Heading>

        <Text>
          👉
          <Link href={resetLink} style={styles.link}>
            Clique aqui para recuperar sua senha
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

export default ResetPassword
