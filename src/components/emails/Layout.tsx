import React from 'react'

import * as styles from '@/components/emails/styles'
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Text,
  Link,
  Img,
} from '@react-email/components'

type Props = {
  children: React.ReactNode
  preview: string
}

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL

export const LayoutEmail = ({ children, preview }: Props) => (
  <Html>
    <Head />
    <Preview>{preview}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Img
          src='data:image/png;base64,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'
          width={134}
          height={24}
          alt='GymPoint'
        />

        {children}

        <Text style={styles.footer}>
          Equipe{' '}
          <Link href={DOMAIN} style={styles.link}>
            GymPoint
          </Link>
        </Text>

        <Text style={styles.footerAlert}>
          Este é um e-mail automático. Não é necessário respondê-lo.
        </Text>
      </Container>
    </Body>
  </Html>
)
