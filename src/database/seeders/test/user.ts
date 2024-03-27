import { PrismaClient } from '@prisma/client'
import * as db from '@prisma/client'

export const userJohnId = 'e6e9bfb8-eedb-91a1-265c-46217b54fd5a'
export const userMikeId = '598915c4-c4fb-2a17-fc10-01cc4830d6f5'
export const userEmilyId = '124a57ed-4b15-d61b-ebcc-4067ac83191a'

export async function createUser(prisma: PrismaClient) {
  const createManyInput: db.Prisma.UserCreateManyInput[] = [
    {
      id: userJohnId,
      name: 'john',
    },
    {
      id: userMikeId,
      name: 'Mike',
    },
    {
      id: userEmilyId,
      name: 'Emily',
    },
  ]
  await prisma.user.createMany({
    data: createManyInput,
  })
}
