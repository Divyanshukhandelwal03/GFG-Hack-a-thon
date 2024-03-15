import express from "express";
import dotenv from "dotenv";
import swagger from "swagger-ui-express";
import userRoute from "./src/features/user/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
dotenv.config();
import apiDocs from "./swagger_ver3.0.json" assert { type: "json" };
import { connectToMongoDB } from "./src/config/mongodb.js";
import loggerMiddleware from "./src/middleware/logger.middleware.js";
import jwtAuthProf from "./src/middleware/jwt.middleware.js";
const app = express();
app.use(express.static("public"));
///////
import HtmlParseRoute from "./src/features/htmlParser/htmlParse.routes.js";
import {parseStrToObj} from "./string_to_obj/conversion.js"

app.use(bodyParser.json({ type: "application/*json" }));
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(urlencodedParser);

app.use(cookieParser());
const port = process.env.PORT || 3000;
var corsOptions = {
  origin: "http://127.0.0.1:3000",
  allowedHeaders: "*",
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(loggerMiddleware);
app.use("/api/user/", userRoute);

//////
//setup view engine(notifying server that we will use view engine)
app.set("view engine", "ejs");

app.use("/api/data/", HtmlParseRoute);

app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
app.get("/api/queryData/", (req, res) => {
  res.render("input_screen");
});
app.post("/api/queryData/",(req,res)=>{
  // console.log(req.body.query_text);
  console.log(req.body.query_in_string);
  console.log("difference");
  let query_text = req.body.query_text;
  let query_string = req.body.query_in_string;
  let data = parseStrToObj(query_string);
  console.log(data);
  // console.log(data[0].child);
  res.send('consoled query Data');
});

app.use((req, res) => {
  res.send("API not found.");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
  connectToMongoDB();
});
