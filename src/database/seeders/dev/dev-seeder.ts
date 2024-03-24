import { PrismaClient } from '@prisma/client'

import { linkUser } from './link-user'
import { user } from './user'

const prisma = new PrismaClient()

async function execute() {
  await user()
  await linkUser()
}

execute()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })