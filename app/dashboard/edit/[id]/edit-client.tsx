"use client"
import { useState } from 'react'
import { useRouter } from 'next/router' // Changed import
import { Software } from '@/lib/types'
import { updateSoftware } from '@/lib/db'
import { SoftwareForm } from '@/components/software/software-form'
import { useToast } from '@/hooks/use-toast'

export default function EditSoftwareClient({
  initialSoftware,
}: {
  initialSoftware: Software
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [software, setSoftware] = useState<Software | null>(initialSoftware)

  const handleSubmit = async (data: Omit<Software, 'id' | 'userId'>) => {
    if (!software?.id) {
      // If software.id is undefined, show an error and return
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Software ID is missing',
      })
      return
    }

    try {
      await updateSoftware(software.id, data) // Now it's guaranteed to be a string
      toast({
        title: 'Success',
        description: 'Software updated successfully',
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

  if (!software) {
    return null
  }

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Software</h1>
      <SoftwareForm
        initialData={software}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/dashboard')}
      />
    </div>
  )
}
