import bcrypt from 'bcryptjs'

import { db } from './db'

async function main() {
  const hasdedPassword = await bcrypt.hash('123456', 10)

  await db.user.upsert({
    where: { email: 'jose.de.silva@gmail.com' },
    update: {},
    create: {
      email: 'jose.de.silva@gmail.com',
      name: 'José de Silva',
      password: hasdedPassword,
      role: 'USER',
    },
  })

  await db.plan.create({
    data: {
      title: 'Start',
      duration: 1,
      value: 12900,
    },
  })
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async () => {
    await db.$disconnect()
    process.exit(1)
  })
