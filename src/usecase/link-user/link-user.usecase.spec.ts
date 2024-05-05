import * as db from '@prisma/client'
import { resetAllWhenMocks, verifyAllWhenMocksCalled, when } from 'jest-when'

import { userEmmaId } from '../../database/seeders/test/link-user'
import { userJohnId } from '../../database/seeders/test/user'
import { LinkUser } from '../../model/link-user'
import { PrismaService } from '../../prisma.service'
import { LinkUserRepository } from '../../repository/link-user/link-user.repository'
import {
  CreateLinkUserOutput,
  GetLinkUsersOutput,
} from './link-user.interface.usecase'
import { LinkUserUsecase } from './link-user.usecase'

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
          weight: 10,
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

  describe('createLinkUser', () => {
    it('正常系', async () => {
      const linkUserCreateInput = {
        id: expect.anything(),
        name: 'hally',
        user: {
          connect: {
            id: userJohnId,
          },
        },
        createdUserId: expect.anything(),
        updatedUserId: expect.anything(),
      }

      const linkUser = {
        ...linkUserCreateInput,
        id: expect.anything(),
        userId: userJohnId,
      }

      const expected: CreateLinkUserOutput = {
        linkUser: linkUser,
      }

      const user = {
        id: userJohnId,
        firebaseUid: 'firebaseUid_john',
        name: 'John',
        email: 'john@example.com',
        createdUserId: userJohnId,
        updatedUserId: userJohnId,
      }

      // mock
      const transactionPrisma = {} as db.Prisma.TransactionClient
      prisma.$transaction = jest
        .fn()
        .mockImplementation((cb) => cb(transactionPrisma))

      repository.createLinkUser = jest.fn()
      when(repository.createLinkUser)
        .calledWith(transactionPrisma, linkUserCreateInput)
        .mockResolvedValue(linkUser)

      // execute
      const result = await usecase.createLinkUser({
        name: 'hally',
        user: user,
      })

      // assertion
      verifyAllWhenMocksCalled()
      expect(result).toMatchObject(expected)
    })
  })
})
