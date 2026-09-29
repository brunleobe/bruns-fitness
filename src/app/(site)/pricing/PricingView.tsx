'use client'

import { useState } from 'react'
import PricingSection from '@/components/pricing/PricingSection'
import PlanModal from '@/components/pricing/PlanModal'

export default function PricingView({ currentPlanId }: { currentPlanId?: string }) {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <PricingSection onBook={() => setModalOpen(true)} currentPlanId={currentPlanId} />
      <PlanModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
