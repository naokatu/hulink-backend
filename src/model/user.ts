import { LinkUser } from './link-user'

export interface User {
  id: string
  firebaseUid: string
  linkUsers?: LinkUser[]
  email: string
  name: string
  createdUserId: string
  updatedUserId: string
}
