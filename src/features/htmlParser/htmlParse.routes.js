import express from "express";
import HtmlParseController from "./htmlParse.controller.js";

const htmlParseController = new HtmlParseController();

const HtmlParseRoute = express.Router();

// HtmlParseRoute.post("/", (req, res) => {
//   htmlParseController.fun(req, res);

//   //   htmlParseController.addTheCode(req, res);
// });

HtmlParseRoute.get("/htmlCode", (req, res) => {
   htmlParseController.displayForm(req, res);
});
HtmlParseRoute.post("/htmlCode", (req, res) => {
  htmlParseController.accessHtmlCode(req, res);
});
HtmlParseRoute.get("/queryData/" , (req,res)=>{
    htmlParseController.displayQueryForm(req,res);
});
HtmlParseRoute.post("/queryData/" , (req,res)=>{
  htmlParseController.developQueryCode_t(req,res);
});

HtmlParseRoute.get("/compareCodeQuery/:id", (req, res) => {
  htmlParseController.checkCodeWithQuery(req, res);
});

// HtmlParseRoute.post("/htmlParse/", (req, res) => {
//   htmlParseController.fun(req, res);
// });

HtmlParseRoute.post("/queryCode/", (req, res) => {
  htmlParseController.developQueryCode(req, res);
});
export default HtmlParseRoute;
