import { db } from '@/lib/firebase' // Firestore instance
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import EditSoftwareClient from './edit-client' // Import the client-side component

// Define types for software data
interface Software {
  id: string
  name: string
  version: string
  installationDate: string
  size: string
  category: string
  installationPath: string
  userId: string
}

// Generate static params for Next.js dynamic routes
export async function generateStaticParams() {
  const softwareCollection = collection(db, 'software') // Replace 'software' with your collection name
  const snapshot = await getDocs(softwareCollection)
  const softwareList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Software[]

  return softwareList.map((software) => ({
    id: software.id,
  }))
}

// EditSoftwarePage Component
export default async function EditSoftwarePage({
  params,
}: {
  params: Promise<{ id: string }> // Ensure params is a Promise that resolves to an object with `id`
}) {
  const resolvedParams = await params // Resolve the Promise

  // Fetching the software data by its ID
  const docRef = doc(db, 'software', resolvedParams.id) // Replace 'software' with your collection name
  const docSnapshot = await getDoc(docRef)

  if (!docSnapshot.exists()) {
    // Return 404 or error page if software not found
    return <div>Software not found</div>
  }

  const softwareData = docSnapshot.data() as Software
  const software = {
    id: docSnapshot.id,
    name: softwareData.name,
    version: softwareData.version,
    installationDate: softwareData.installationDate,
    size: softwareData.size,
    category: softwareData.category,
    installationPath: softwareData.installationPath,
    userId: softwareData.userId,
  }

  return <EditSoftwareClient initialSoftware={software} />
}
