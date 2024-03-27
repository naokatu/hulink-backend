import { PrismaClient } from '@prisma/client'
import * as db from '@prisma/client'

export const userJohnId = 'e4e5df5f-03ec-830e-4f14-ae5c82b6aa79'
export const userMikeId = 'AA2D6AC8-3CC6-48CB-B559-038A86C97F94'
export const userEmilyId = '0193C28F-A9E2-4991-9B12-18BE6BF220EA'

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
