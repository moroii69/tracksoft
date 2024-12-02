'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/auth-provider'
import { SoftwareForm } from '@/components/software/software-form'
import { addSoftware } from '@/lib/db'
import { useToast } from '@/hooks/use-toast'
import type { SoftwareFormData } from '@/lib/types'

export default function AddSoftwarePage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (data: SoftwareFormData) => {
    if (!user) return

    try {
      await addSoftware(user.uid, data)
      toast({
        title: 'Success',
        description: 'Software added successfully',
      })
      router.push('/dashboard')
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      })
    }
  }

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Software</h1>
      <SoftwareForm
        onSubmit={handleSubmit}
        onCancel={() => router.push('/dashboard')}
      />
    </div>
  )
}