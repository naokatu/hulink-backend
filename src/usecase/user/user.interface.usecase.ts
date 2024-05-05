import { User } from '../../model/user'

export interface GetUserInput {
  firebaseUid: string
}
export interface GetUserOutput {
  user: User
}

export interface CreateUserOutput {
  user: User
}

export interface CreateUserInput {
  firebaseUid: string
  name: string
  email: string
}
