'use client'

import { useOptimistic, useTransition } from 'react'
import TrainersSection from '@/components/trainers/TrainersSection'
import { cancelSessionRequest, requestSession } from '@/lib/server/actions'
import { addSessionRequest, removeSessionRequest } from '@/lib/sessionRequests'

type RequestChange = { type: 'request' | 'cancel'; trainerId: string }

export default function MemberTrainers({ requestedIds }: { requestedIds: string[] }) {
  // Same rules as the server actions, so the button flips instantly.
  const [optimisticIds, applyChange] = useOptimistic(requestedIds, (ids, change: RequestChange) =>
    change.type === 'request'
      ? addSessionRequest(ids, change.trainerId)
      : removeSessionRequest(ids, change.trainerId),
  )
  const [, startTransition] = useTransition()

  function handleRequest(trainerId: string) {
    startTransition(async () => {
      applyChange({ type: 'request', trainerId })
      await requestSession(trainerId)
    })
  }

  function handleCancel(trainerId: string) {
    startTransition(async () => {
      applyChange({ type: 'cancel', trainerId })
      await cancelSessionRequest(trainerId)
    })
  }

  return (
    <TrainersSection
      requestedIds={optimisticIds}
      onRequestSession={handleRequest}
      onCancelSession={handleCancel}
    />
  )
}
