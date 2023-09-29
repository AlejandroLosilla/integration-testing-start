import { Client } from "pg"
import { config } from "../Shared/config.js"

const { host, port: port1, user: user1, db, password: password1 } = config.postgres
export const PostgresSQLClient = new Client({
  user: user1,
  host: host,
  database: db,
  password: password1,
  port: port1,
})
