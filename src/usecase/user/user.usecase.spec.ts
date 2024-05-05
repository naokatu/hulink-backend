import * as db from '@prisma/client'
import { resetAllWhenMocks, verifyAllWhenMocksCalled, when } from 'jest-when'

import { userJohnId } from '../../database/seeders/test/user'
import { User } from '../../model/user'
import { PrismaService } from '../../prisma.service'
import { UserRepository } from '../../repository/user/user.repository'
import { GetUserOutput } from './user.interface.usecase'
import { UserUsecase } from './user.usecase'

describe('UserUsecase', () => {
  let prisma: PrismaService
  let repository: UserRepository
  let usecase: UserUsecase

  beforeEach(() => {
    prisma = jest.createMockFromModule('../../prisma.service')
    repository = jest.createMockFromModule(
      '../../repository/user/user.repository',
    )
    usecase = new UserUsecase(repository, prisma)
    jest.clearAllMocks()
    resetAllWhenMocks()
  })

  describe('getUser', () => {
    it('正常系', async () => {
      const user: User = {
        id: userJohnId,
        firebaseUid: 'firebaseUid_john',
        name: 'John',
        email: 'john@example.com',
        createdUserId: userJohnId,
        updatedUserId: userJohnId,
      }

      const expected: GetUserOutput = {
        user: user,
      }

      // mock
      const transactionPrisma = {} as db.Prisma.TransactionClient
      prisma.$transaction = jest
        .fn()
        .mockImplementation((cb) => cb(transactionPrisma))

      repository.getUser = jest.fn()
      when(repository.getUser)
        .calledWith(transactionPrisma, 'firebaseUid_john')
        .mockResolvedValue(user)

      // execute
      const result = await usecase.getUser({ firebaseUid: 'firebaseUid_john' })

      // assertion
      verifyAllWhenMocksCalled()
      expect(result).toMatchObject(expected)
    })
  })

  describe('createUser', () => {
    it('正常系', async () => {
      const userCreateInput = {
        id: expect.anything(),
        firebaseUid: 'firebaseUid_sally',
        name: 'Sally',
        email: 'sally@example.com',
        createdUserId: expect.anything(),
        updatedUserId: expect.anything(),
      }

      const user = {
        ...userCreateInput,
        linkUsers: [],
      }

      const expected: GetUserOutput = {
        user: user,
      }

      // mock
      const transactionPrisma = {} as db.Prisma.TransactionClient
      prisma.$transaction = jest
        .fn()
        .mockImplementation((cb) => cb(transactionPrisma))

      repository.createUser = jest.fn()
      when(repository.createUser)
        .calledWith(transactionPrisma, userCreateInput)
        .mockResolvedValue(user)

      // execute
      const result = await usecase.createUser({
        firebaseUid: 'firebaseUid_sally',
        name: 'Sally',
        email: 'sally@example.com',
      })

      // assertion
      verifyAllWhenMocksCalled()
      expect(result).toMatchObject(expected)
    })
  })
})
