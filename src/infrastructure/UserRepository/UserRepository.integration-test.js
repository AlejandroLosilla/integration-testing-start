import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import { UserRepositoryRedis } from "./UserRepositoryRedis.js"
import { UserRepositoryMongo } from "./UserRepositoryMongo.js"
import { UserRepositoryPostgresSQL } from "./UserRepositoryPostgresSQL.js"
import { User } from "../../domain/models/User.js"

describe.each([
  ["Mongo", UserRepositoryMongo],
  ["PostgresSQL", UserRepositoryPostgresSQL],
  ["Redis", UserRepositoryRedis],
])("UserRepository%s", (name, UserRepository) => {
  let userRepository

  beforeAll(async () => {
    userRepository = new UserRepository()
    await userRepository.connect()
  })

  beforeEach(async () => {
    await userRepository.reset()
  })

  afterAll(async () => {
    await userRepository.disconnect()
  })

  it("saves a user in the database", async () => {
    const id = "00000000-0000-0000-0000-000000000000"
    const name = "John Doe"
    const email = "john@email.com"
    const age = 18
    const password = "password"
    const user = User.create(id, name, email, password, age)

    await userRepository.save(user)

    const savedUser = await userRepository.findById(id)
    expect(savedUser).toEqual(user)
  })

  it("findById returns null if user not found", async () => {
    const id = "00000000-0000-0000-0000-000000000000"

    const savedUser = await userRepository.findById(id)

    expect(savedUser).toEqual(null)
  })

  it("existsByEmail returns true if user is found", async () => {
    const id = "00000000-0000-0000-0000-000000000000"
    const name = "John Doe"
    const email = "john@email.com"
    const age = 18
    const password = "password"
    const user = User.create(id, name, email, password, age)

    await userRepository.save(user)

    const existsUser = await userRepository.existsByEmail(email)
    expect(existsUser).toBe(true)
  })

  it("existsByEmail returns false if user is not found", async () => {
    const email = "john@email.com"

    const existsUser = await userRepository.existsByEmail(email)
    expect(existsUser).toBe(false)
  })
})

// describe("UserRepository", () => {
//   let mongoUserRepository
//   let postgresUserRepository
//   let redisUserRepository
//
//   beforeAll(async () => {
//     mongoUserRepository = new UserRepositoryMongo()
//     await mongoUserRepository.connect()
//     postgresUserRepository = new UserRepositoryPostgresSQL()
//     await postgresUserRepository.connect()
//     redisUserRepository = new UserRepositoryRedis()
//     await redisUserRepository.connect()
//   })
//
//   beforeEach(async () => {
//     await mongoUserRepository.reset()
//     await postgresUserRepository.reset()
//     await redisUserRepository.reset()
//   })
//
//   afterAll(async () => {
//     await mongoUserRepository.disconnect()
//     await postgresUserRepository.disconnect()
//     await redisUserRepository.disconnect()
//   })
//
//   it("saves a user in the database", async () => {
//     const id = "00000000-0000-0000-0000-000000000000"
//     const name = "John Doe"
//     const email = "john@email.com"
//     const age = 18
//     const password = "password"
//     const user = User.create(id, name, email, password, age)
//
//     await mongoUserRepository.save(user)
//     await postgresUserRepository.save(user)
//     await redisUserRepository.save(user)
//
//     const mongoUser = await mongoUserRepository.findById(id)
//     expect(mongoUser).toEqual(user)
//
//     const postgresUser = await postgresUserRepository.findById(id)
//     expect(postgresUser).toEqual(user)
//
//     const redisUser = await redisUserRepository.findById(id)
//     expect(redisUser).toEqual(user)
//   })
//
//   it("findById returns null if user not found", async () => {
//     const id = "00000000-0000-0000-0000-000000000000"
//
//     const mongoUser = await mongoUserRepository.findById(id)
//     expect(mongoUser).toEqual(null)
//
//     const postgresUser = await postgresUserRepository.findById(id)
//     expect(postgresUser).toEqual(null)
//
//     const redisUser = await redisUserRepository.findById(id)
//     expect(redisUser).toEqual(null)
//   })
//
//   it("existsByEmail returns true if user is found", async () => {
//     const id = "00000000-0000-0000-0000-000000000000"
//     const name = "John Doe"
//     const email = "john@email.com"
//     const age = 18
//     const password = "password"
//     const user = User.create(id, name, email, password, age)
//
//     await mongoUserRepository.save(user)
//     await postgresUserRepository.save(user)
//     await redisUserRepository.save(user)
//
//     const mongoExistsUser = await mongoUserRepository.existsByEmail(email)
//     expect(mongoExistsUser).toBe(true)
//
//     const postgresExistsUser = await postgresUserRepository.existsByEmail(email)
//     expect(postgresExistsUser).toBe(true)
//
//     const redisExistsUser = await redisUserRepository.existsByEmail(email)
//     expect(redisExistsUser).toBe(true)
//   })
//
//   it("existsByEmail returns false if user is not found", async () => {
//     const email = "john@email.com"
//
//     const mongoExistsUser = await mongoUserRepository.existsByEmail(email)
//     expect(mongoExistsUser).toBe(false)
//
//     const postgresExistsUser = await postgresUserRepository.existsByEmail(email)
//     expect(postgresExistsUser).toBe(false)
//
//     const redisExistsUser = await redisUserRepository.existsByEmail(email)
//     expect(redisExistsUser).toBe(false)
//   })
// })
