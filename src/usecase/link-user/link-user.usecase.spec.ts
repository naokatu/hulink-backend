import * as db from '@prisma/client'
import { resetAllWhenMocks, verifyAllWhenMocksCalled, when } from 'jest-when'

import { userEmmaId } from '../../database/seeders/test/link-user'
import { LinkUser } from '../../model/link-user'
import { PrismaService } from '../../prisma.service'
import { LinkUserRepository } from '../../repository/link-user/link-user.repository'
import { GetLinkUsersOutput } from './link-user.interface.usecase'
import { LinkUserUsecase } from './link-user.usecase'
import { userJohnId } from '../../database/seeders/test/user'

describe('LinkUserUsecase', () => {
  let prisma: PrismaService
  let repository: LinkUserRepository
  let usecase: LinkUserUsecase

  beforeEach(() => {
    prisma = jest.createMockFromModule('../../prisma.service')
    repository = jest.createMockFromModule(
      '../../repository/link-user/link-user.repository',
    )
    usecase = new LinkUserUsecase(repository, prisma)
    jest.clearAllMocks()
    resetAllWhenMocks()
  })

  describe('getLinkUsers', () => {
    it('正常系', async () => {
      const linkUsers: LinkUser[] = [
        {
          id: userEmmaId,
          userId: userJohnId,
          name: 'Emma',
          encount: 10,
          label: 'family',
          sex: 'female',
        },
      ]

      const expected: GetLinkUsersOutput = {
        linkUsers: linkUsers,
      }

      // mock
      const transactionPrisma = {} as db.Prisma.TransactionClient
      prisma.$transaction = jest
        .fn()
        .mockImplementation((cb) => cb(transactionPrisma))

      repository.getLinkUsers = jest.fn()
      when(repository.getLinkUsers)
        .calledWith(transactionPrisma)
        .mockResolvedValue(linkUsers)

      // execute
      const result = await usecase.getLinkUsers()

      // assertion
      verifyAllWhenMocksCalled()
      expect(result).toMatchObject(expected)
    })
  })
})
