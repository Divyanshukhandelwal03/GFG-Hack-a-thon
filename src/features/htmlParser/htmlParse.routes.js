import express from "express";
import HtmlParseController from "./htmlParse.controller.js";

const htmlParseController = new HtmlParseController();

const HtmlParseRoute = express.Router();


HtmlParseRoute.get("/htmlCode/:id", (req, res) => {
   htmlParseController.displayForm(req, res);
});

HtmlParseRoute.post("/htmlCode/:id", (req, res) => {
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

HtmlParseRoute.post("/queryCode/", (req, res) => {
  htmlParseController.developQueryCode(req, res);
});
export default HtmlParseRoute;
