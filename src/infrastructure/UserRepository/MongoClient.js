import { MongoClient as Mongo } from "mongodb"
import { config } from "../Shared/config.js"

const { port, user, password, address } = config.mongo
export const MongoClient = new Mongo(`mongodb://${user}:${password}@${address}:${port}`)
