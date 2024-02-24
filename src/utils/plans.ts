import { db } from '@/lib/db'

type Plan = {
  id: string
  title: string
  duration: number
  value: number
}

const getAllPlans = async (): Promise<Plan[] | null> => {
  try {
    const plans = await db.plan.findMany()

    return plans
  } catch {
    return null
  }
}

export { getAllPlans }
