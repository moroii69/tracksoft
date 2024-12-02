export interface Software {
  id: string
  name: string
  version: string
  installationDate: string
  size: string
  category: string
  installationPath: string
  userId: string
}

export type SoftwareFormData = Omit<Software, 'id' | 'userId'>