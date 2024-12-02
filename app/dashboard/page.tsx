'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/providers/auth-provider'
import { Software } from '@/lib/types'
import { getUserSoftware, deleteSoftware } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SoftwareSearch } from '@/components/software/software-search'
import { SoftwareOverview } from '@/components/software/software-overview'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'

export default function DashboardPage() {
  const { user } = useAuth()  // Get the user from the auth provider
  const [software, setSoftware] = useState<Software[]>([])
  const [filteredSoftware, setFilteredSoftware] = useState<Software[]>([])
  const router = useRouter()
  const { toast } = useToast()

  // Redirect to login if the user is not signed in
  useEffect(() => {
    if (!user) {
      router.push('/login')  // Redirect to login if no user is found
    } else {
      getUserSoftware(user.uid).then((data) => {
        setSoftware(data)
        setFilteredSoftware(data)
      })
    }
  }, [user, router])  // Dependencies include user and router to handle both cases

  const handleSearch = (query: string) => {
    const filtered = software.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredSoftware(filtered)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteSoftware(id)
      setSoftware((prev) => prev.filter((item) => item.id !== id))
      setFilteredSoftware((prev) => prev.filter((item) => item.id !== id))
      toast({
        title: 'Success',
        description: 'Software deleted successfully',
      })
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      })
    }
  }

  if (!user) {
    // Optionally return null while redirecting or loading
    return null
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Software</h1>
        <Button onClick={() => router.push('/dashboard/add')}>
          <Plus className="mr-2 h-4 w-4" /> Add Software
        </Button>
      </div>

      <SoftwareOverview software={software} />

      <div className="max-w-md">
        <SoftwareSearch onSearch={handleSearch} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSoftware.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6">
              <h3 className="text-2xl font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">Version: {item.version}</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm">Category: {item.category}</p>
                <p className="text-sm">Size: {item.size}</p>
                <p className="text-sm">
                  Installed: {new Date(item.installationDate).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/dashboard/edit/${item.id}`)}
                >
                  <Pencil className="mr-2 h-4 w-4" /> Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        software and remove it from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(item.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
