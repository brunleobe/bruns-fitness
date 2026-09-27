'use client'

import { useState } from 'react'
import ClassesSection from '@/components/ClassesSection'
import PlanModal from '@/components/PlanModal'

export default function ClassesPage() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <ClassesSection onBook={() => setModalOpen(true)} />
      <PlanModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
