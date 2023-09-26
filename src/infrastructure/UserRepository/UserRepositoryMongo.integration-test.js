import { describe, it, expect, beforeEach, afterEach, afterAll, beforeAll } from "vitest";
import { UserRepositoryMongo } from "./UserRepositoryMongo";
import {User} from "../../domain/models/User.js";

describe("UserRepositoryMongo", () => {
    let userRepositoryMongo;

    beforeAll(async () => {
        userRepositoryMongo = new UserRepositoryMongo();
        await userRepositoryMongo.connect();
    })

    beforeEach(async () => {
        await userRepositoryMongo.reset();
    })

    afterAll(async () => {
        await userRepositoryMongo.disconnect();
    })

    it("Saves user", async () => {
        const id = 1;
        const name = "name";
        const email = "email@gmail.com";
        const password = "password";
        const age = 20;

        const user = User.create(id, name, email, password, age);
        
        await userRepositoryMongo.save(user);

        const userSaved = userRepositoryMongo.findById(id);
        console.log(user, userSaved);
        expect(userSaved).toEqual(user);
        
    })
})

