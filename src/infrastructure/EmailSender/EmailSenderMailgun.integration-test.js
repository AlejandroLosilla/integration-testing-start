import { describe, expect, it } from "vitest"
import { EmailSenderMailgun } from "./EmailSenderMailgun.js"
import { User } from "../../domain/models/User.js"
import { TestInbox } from "./TestInbox.js"

describe("EmailSenderMailgun", () => {
  it("sends a welcome email to the user", async () => {
    const emailSender = new EmailSenderMailgun()
    const testInbox = new TestInbox()
    const id = "00000000-0000-0000-0000-000000000000"
    const name = "John Doe"
    const email = "kcat1.test@inbox.testmail.app"
    const age = 18
    const password = "password"
    const user = User.create(id, name, email, password, age)

    await emailSender.sendWelcomeEmail(user)

    const receivedEmail = await testInbox.getLastEmail()
    expect(receivedEmail.text).toContain("Welcome to my app")
  })
})
