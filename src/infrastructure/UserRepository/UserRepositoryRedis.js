import { createClient } from "redis"
import { UserRepository } from "../../domain/repository/UserRepository.js"
import { UserPassword } from "../../domain/models/UserPassword.js"
import { User } from "../../domain/models/User.js"

export class UserRepositoryRedis extends UserRepository {
  constructor() {
    super()
    this.client = createClient()
    this.client.on("error", (err) => console.log("Redis Client Error", err))
  }

  async connect() {
    await this.client.connect()
  }

  async disconnect() {
    await this.client.disconnect()
  }

  async reset() {
    await this.client.flushAll()
  }

  async save(user) {
    const key = `user:${user.id}`
    await this.client.set(key, JSON.stringify(user))
  }

  async findById(id) {
    const key = `user:${id}`
    const user = await this.client.get(key)

    if (!user) {
      return null
    }

    const mapUser = JSON.parse(user)

    return new User(
      mapUser.id,
      mapUser.name,
      mapUser.email.email,
      new UserPassword(mapUser.password.password),
      mapUser.age.age,
    )
  }

  async existsByEmail(email) {
    const keys = await this.client.keys("user:*")

    for (const key of keys) {
      const user = await this.client.get(key)
      const mapUser = JSON.parse(user)

      if (mapUser.email.email === email) {
        return true
      }
    }

    return false
  }
}
