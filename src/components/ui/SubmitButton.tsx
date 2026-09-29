'use client'

import { useFormStatus } from 'react-dom'

interface SubmitButtonProps {
  children: React.ReactNode
  pendingLabel: string
  className?: string
}

/** Submit button for a server-action form; shows `pendingLabel` while the action runs. */
export default function SubmitButton({ children, pendingLabel, className = '' }: SubmitButtonProps) {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className={`${className} disabled:opacity-50 disabled:cursor-wait`}>
      {pending ? pendingLabel : children}
    </button>
  )
}
