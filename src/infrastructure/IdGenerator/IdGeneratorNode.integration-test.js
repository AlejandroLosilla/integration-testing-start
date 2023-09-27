import { describe, it, expect } from "vitest"
import { IdGeneratorNode } from "./IdGeneratorNode"

describe("IdGeneratorNode", () => {
  it("generates a unique id each time", () => {
    const idGenerator = new IdGeneratorNode()
    const id1 = idGenerator.generate()
    const id2 = idGenerator.generate()
    expect(id1).not.toBe(id2)
  })
})
