'use client'

import { useOptimistic, useTransition } from 'react'
import TrainersSection from '@/components/trainers/TrainersSection'
import { requestSession } from '@/lib/server/actions'

export default function MemberTrainers({ requestedIds }: { requestedIds: string[] }) {
  const [optimisticIds, addRequest] = useOptimistic(
    requestedIds,
    (state, trainerId: string) => [...state, trainerId],
  )
  const [, startTransition] = useTransition()

  function handleRequest(trainerId: string) {
    startTransition(async () => {
      addRequest(trainerId)
      await requestSession(trainerId)
    })
  }

  return <TrainersSection requestedIds={optimisticIds} onRequestSession={handleRequest} />
}
