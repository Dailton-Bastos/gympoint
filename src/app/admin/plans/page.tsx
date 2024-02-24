import React from 'react'

import { PlansList } from '@/components/admin/plans/list'
import { getAllPlans } from '@/utils/plans'

const PlansPage = async () => {
  const plans = await getAllPlans()

  return <PlansList plans={plans} />
}

export default PlansPage
