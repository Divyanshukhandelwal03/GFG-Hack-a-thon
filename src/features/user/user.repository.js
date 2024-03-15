import { getDB } from "../../config/mongodb.js";

export default class userRepository {
  constructor() {
    this.collection = "User";
  }

  async signUp(newUser) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(newUser);
      return newUser;
    } catch (err) {
      throw new ApplicationError("something went wrong", 500);
    }
  }

  async findByEmail(email) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.findOne({ email });
    } catch (e) {
      throw new ApplicationError("something went wrong", 500);
    }
  }
}
