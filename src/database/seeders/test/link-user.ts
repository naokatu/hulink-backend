import { PrismaClient } from '@prisma/client'
import * as db from '@prisma/client'

export const userEmmaId = 'e247b44c-cd10-7df8-92a7-7184e0c657d1'
export const userLilyId = 'd08510a5-83e2-1ab4-0f1d-a6e3f937a059'
export const userSamId = 'cf581cb2-267e-b094-ba0d-ba790aa14308'

export async function createLinkUser(prisma: PrismaClient) {
  const createManyInput: db.Prisma.LinkUserCreateManyInput[] = [
    {
      id: userEmmaId,
      name: 'Emma',
      encount: 10,
      label: 'family',
      sex: 'female',
    },
    {
      id: userLilyId,
      name: 'Lily',
      encount: 10,
      label: 'family',
      sex: 'female',
    },
    {
      id: userSamId,
      name: 'Sam',
      encount: 1,
      label: 'friend',
      sex: 'male',
    },
  ]
  await prisma.linkUser.createMany({
    data: createManyInput,
  })
}
