import { db } from '@/lib/firebase'
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { Software, SoftwareFormData } from '@/lib/types'

const COLLECTION_NAME = 'software'

export async function addSoftware(userId: string, data: SoftwareFormData): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...data,
    userId,
    installationDate: new Date(data.installationDate).toISOString(),
  })
  return docRef.id
}

export async function updateSoftware(id: string, data: Partial<SoftwareFormData>): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id)
  if (data.installationDate) {
    data.installationDate = new Date(data.installationDate).toISOString()
  }
  await updateDoc(docRef, data)
}

export async function deleteSoftware(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id)
  await deleteDoc(docRef)
}

export async function getUserSoftware(userId: string): Promise<Software[]> {
  const q = query(collection(db, COLLECTION_NAME), where('userId', '==', userId))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Software))
}