export class UserRepository {
  /**
   * @param {User} user
   * @returns {Promise<void>}
   */
  // eslint-disable-next-line no-unused-vars
  async save(user) {
    throw new Error("This is an abstract class. You should implement the save method")
  }

  /**
   * @param {string} id
   * @returns {Promise<User|null>}
   */
  // eslint-disable-next-line no-unused-vars
  async findById(id) {
    throw new Error("This is an abstract class. You should implement the findById method")
  }

  /**
   *
   * @param {string} email
   * @returns {Promise<User|null>}
   */
  // eslint-disable-next-line no-unused-vars
  async existsByEmail(email) {
    throw new Error("This is an abstract class. You should implement the existsByEmail method")
  }
}
