'use client'

import { useState } from 'react'
import ClassesSection from '@/components/classes/ClassesSection'
import PlanModal from '@/components/pricing/PlanModal'

export default function GuestClasses() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <ClassesSection onBook={() => setModalOpen(true)} />
      <PlanModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
