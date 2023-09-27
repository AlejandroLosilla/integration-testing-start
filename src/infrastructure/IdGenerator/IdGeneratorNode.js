import { IdGenerator } from "../../domain/services/IdGenerator.js"
import { randomUUID } from "crypto"

export class IdGeneratorNode extends IdGenerator {
  generate() {
    return randomUUID()
  }
}
