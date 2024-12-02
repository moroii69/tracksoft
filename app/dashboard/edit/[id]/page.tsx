import { db } from '@/lib/firebase' // Firestore instance
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import EditSoftwareClient from './edit-client' // Import the client-side component

export async function generateStaticParams() {
  const softwareCollection = collection(db, 'software') // Replace 'software' with your collection name
  const snapshot = await getDocs(softwareCollection)
  const softwareList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

  return softwareList.map((software) => ({
    id: software.id,
  }))
}

export default async function EditSoftwarePage({
  params,
}: {
  params: { id: string }
}) {
  const docRef = doc(db, 'software', params.id) // Replace 'software' with your collection name
  const docSnapshot = await getDoc(docRef)

  if (!docSnapshot.exists()) {
    // Handle missing software (e.g., return a 404 page or redirect)
    return <div>Software not found</div>
  }

  const software = { id: docSnapshot.id, ...docSnapshot.data() }

  return <EditSoftwareClient initialSoftware={software} />
}
