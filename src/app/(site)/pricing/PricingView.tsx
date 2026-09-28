'use client'

import { useState } from 'react'
import PricingSection from '@/components/PricingSection'
import PlanModal from '@/components/PlanModal'

export default function PricingPage() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <PricingSection onBook={() => setModalOpen(true)} />
      <PlanModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
