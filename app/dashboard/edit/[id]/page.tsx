import dynamic from 'next/dynamic'
import { db } from '@/lib/firebase'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'

// Dynamically import EditSoftwareClient with ssr: false to ensure it only runs on the client side
const EditSoftwareClient = dynamic(() => import('./edit-client'), { ssr: false })

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

export async function generateStaticParams() {
  const softwareCollection = collection(db, 'software')
  const snapshot = await getDocs(softwareCollection)
  const softwareList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Software[]

  return softwareList.map((software) => ({
    id: software.id,
  }))
}

export default async function EditSoftwarePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params

  // Fetch the software data by its ID
  const docRef = doc(db, 'software', resolvedParams.id)
  const docSnapshot = await getDoc(docRef)

  if (!docSnapshot.exists()) {
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

  // Pass the fetched data to the dynamically imported client component
  return <EditSoftwareClient initialSoftware={software} />
}
