import express from "express";
import dotenv from "dotenv";
import userRoute from "./src/features/user/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
dotenv.config();
import { connectToMongoDB } from "./src/config/mongodb.js";
import loggerMiddleware from "./src/middleware/logger.middleware.js";
import jwtAuthProf from "./src/middleware/jwt.middleware.js";
const app = express();
app.use(express.static("public"));
///////
import HtmlParseRoute from "./src/features/htmlParser/htmlParse.routes.js";

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


app.use((req, res) => {
  res.send("API not found.");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
  connectToMongoDB();
});
