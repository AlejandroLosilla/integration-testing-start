import { UserPassword } from "../../domain/models/UserPassword.js";
import { UserRepository } from "../../domain/repository/UserRepository.js";
import { MongoClient } from "mongodb";

export class UserRepositoryMongo extends UserRepository{

    constructor(){
        super();

        this.url = "mongodb://admin:password@localhost:27017";
        this.dbName = "EOI-login-integration";
        this.collectionName = "users";
        this.client = new MongoClient(this.url);
    }

    async connect(){
        await this.client.connect();
        this.database = this.client.db(this.dbName);
        this.collection = this.database.collection(this.collectionName);
    }

    async disconnect(){
        await this.client.close();
    }

    async reset(){
        await this.collection.deleteMany({});
    }

    async save(user){
        await this.collection.insertOne(user);
    }
    
    async findById(id){
        const user = await this.collection.findOne({id});
        return new User(
            user.id,
            user.email.email,
            user.name,
            user.age,
            new UserPassword(user.password.password)
        );
    }
}