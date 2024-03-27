import { PrismaClient } from '@prisma/client'

import { createLinkUser } from './link-user'
import { createUser } from './user'

const prisma = new PrismaClient()

async function execute() {
  await createUser()
  await createLinkUser()
}

execute()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
