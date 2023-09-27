import pkg from "pg"
import { up as up1695748002836 } from "./1695748002836.js"

const { Client } = pkg

const client = new Client({
  user: "admin",
  host: "localhost",
  database: "my-project",
  password: "password",
  port: 5431,
})

async function run() {
  try {
    await client.connect()
    await up1695748002836(client)
    console.log("Migration run successfully")
  } catch (error) {
    console.error("Migration failed", error)
  } finally {
    await client.end()
  }
}

run()
