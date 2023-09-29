import { EmailSender } from "../../domain/services/EmailSender.js"
import { API_MAILGUN } from "../../temp.js"

export class EmailSenderMailgun extends EmailSender {
  constructor({
    domain = "sandbox438c8dd938f0410aa1dd0393b97f4f46.mailgun.org",
    authUser = "api",
    apiKey = API_MAILGUN,
  } = {}) {
    super()
    this.domain = domain
    this.authUser = authUser
    this.apiKey = apiKey
  }
  async sendWelcomeEmail(user) {
    const body = new FormData()
    const url = `https://api.mailgun.net/v3/${this.domain}/messages`
    const options = {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${this.authUser}:${this.apiKey}`)}`,
      },
      body,
    }
    const from = `Excited User <mailgun@${this.domain}>`
    const to = user.email.email
    const subject = "Welcome"
    const text = "Welcome to my app"

    body.append("from", from)
    body.append("to", to)
    body.append("subject", subject)
    body.append("text", text)

    const request = await fetch(url, options)
    const response = await request.json()

    if (!request.ok) {
      throw new Error(response.message)
    }
  }
}
