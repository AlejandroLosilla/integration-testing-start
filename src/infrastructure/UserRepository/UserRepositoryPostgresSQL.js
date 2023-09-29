import { UserRepository } from "../../domain/repository/UserRepository.js"
import { UserPassword } from "../../domain/models/UserPassword.js"
import { User } from "../../domain/models/User.js"
import { PostgresSQLClient } from "./PostgresSQLClient.js"

export class UserRepositoryPostgresSQL extends UserRepository {
  constructor({ client = PostgresSQLClient } = {}) {
    super()
    this.client = client
  }

  async connect() {
    await this.client.connect()
  }

  async disconnect() {
    await this.client.end()
  }

  async reset() {
    await this.client.query("DELETE FROM users")
  }

  async save(user) {
    const query = {
      text: "INSERT INTO users(id, name, email, password, age) VALUES($1, $2, $3, $4, $5)",
      values: [user.id, user.name, user.email.email, user.password.password, user.age.age],
    }

    await this.client.query(query)
  }

  async findById(id) {
    const query = "SELECT * FROM users WHERE id = $1"
    const values = [id]

    const result = await this.client.query(query, values)
    const user = result.rows[0]

    if (!user) {
      return null
    }

    return new User(user.id, user.name, user.email, new UserPassword(user.password), user.age)
  }

  async existsByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1"
    const values = [email]

    const result = await this.client.query(query, values)
    const user = result.rows[0]

    return Boolean(user)
  }
}
