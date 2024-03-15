import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
// import { ApplicationError } from "../../error_handler/applicationError.js";
class htmlParserGFG {
  constructor() {
    this.collection = "queryData";
  }
  async add(data) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne({ data });
      return { message: "success" };
    } catch (err) {
      console.log(err);
      // throw new ApplicationError("Something went wrong with database" , 500);
    }
  }
  async get(id) {
    try {
      const db =await getDB();
      const collection =await db.collection(this.collection);
      const data = await collection.findOne({_id:new ObjectId(id)});
      return data;
    } catch (err) {
      console.log(err);
      // throw new ApplicationError("Something went wrong with database" , 500);
    }
  }
}
export default htmlParserGFG;
