import { PrismaClient } from '@prisma/client'
import * as db from '@prisma/client'

export const userJohnId = 'c215edb1-1bf7-1b0b-095c-a0f2dd2958e3'
export const userMikeId = '5289e254-2002-b16a-dd84-2ddf14caa35e'
export const userEmilyId = 'a66c5a75-fc5e-899f-ad6f-3cf51a3aa73d'

export async function createUser(prisma: PrismaClient) {
  const createManyInput: db.Prisma.UserCreateManyInput[] = [
    {
      id: userJohnId,
      name: 'john',
      firebaseUid: 'firebaseUid_john',
      email: 'john@example.com',
      createdUserId: userJohnId,
      updatedUserId: userJohnId,
    },
    {
      id: userMikeId,
      name: 'Mike',
      firebaseUid: 'firebaseUid_mike',
      email: 'mike@example.com',
      createdUserId: userMikeId,
      updatedUserId: userMikeId,
    },
    {
      id: userEmilyId,
      name: 'Emily',
      firebaseUid: 'firebaseUid_emily',
      email: 'emily@example.com',
      createdUserId: userEmilyId,
      updatedUserId: userEmilyId,
    },
  ]
  await prisma.user.createMany({
    data: createManyInput,
  })
}
