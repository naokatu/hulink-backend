import { LinkUser } from '../../model/link-user'
import { User } from '../../model/user'

export interface GetLinkUsersOutput {
  linkUsers: LinkUser[]
}

export interface CreateLinkUserOutput {
  linkUser: LinkUser
}

export interface CreateLinkUserInput {
  name: string
  user: User
}
