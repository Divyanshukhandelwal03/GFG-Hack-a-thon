import { parse } from "node-html-parser";
import { checking } from "./checking.js";
import *as fs from "fs";
// jsdom
import { parseStrToObj } from "../../../string_to_obj/conversion.js";
import { JSDOM } from "jsdom";
//repository
import htmlParserGFG from "./htmlParse.repository.js";
export default class HtmlParseController {
  constructor() {
    this.htmlParserGfg = new htmlParserGFG();
  }
  // async addTheCode(req, res) {
  //   try {
  //     const desc = req.body.desc;
  //     console.log(req.body);
  //     const output = await this.htmlParserGfg.add(desc);
  //     res.status(201).send("output");
  //     //   next();
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).send("something went wrong");
  //   }
  // }
  async displayQueryForm(req,res){
    return res.render("input_screen");
  }
  async displayForm(req, res) {
    return res.render("form_input");
  }
  async accessHtmlCode(req,res){
    console.log(req.body);
    res.send('data_recieved');
  }
  async checkTheCode(req, res) {
    try {
      const data = await this.htmlParserGfg.get(req.params.id);
    } catch (err) {
      console.log(err);
      return res.status(500).send("something went wrong");
    }
  }
  // async fun(req, res) {
  //   //jsdom
  //       const dom = new JSDOM();
  //   // console.log(
  //   //   dom.window.document.getElementById("welcome-section").innerHTML
  //   // );
  //   res.send("Success");
  // }
  async developQueryCode_t(req,res){
  // console.log("difference");
  let query_text = req.body.query_text;
  let query_string = req.body.query_in_string;
  let data = parseStrToObj(query_string);
  try{
    const output = await this.htmlParserGfg.add(data);
    res.status(201).send(output);
   }catch(err)
   {
     console.log('data recieved in query can not be added in the database');
     return res.status(500).send('something went wrong');
   }
  }
  async developQueryCode(req,res){
    console.log(req.body.data);
     try{
      const output = await this.htmlParserGfg.add(req.body.data);
      res.status(201).send(output);
     }catch(err)
     {
       console.log('data recieved in query can not be added in the database');
       return res.status(500).send('something went wrong');
     }
  }
  
  async checkCodeWithQuery(req,res){
    const arr= [];
    
     const queries = await this.htmlParserGfg.get(req.params.id);
    //  console.log(queries);
    //  let userCode = req.body.data;
    //  console.log(req.body.data)
    //  const dom = new JSDOM(userCode);
    //  const document=dom.window.document;
     const parsed_Data = parse(req.body.data);
    //  checking(queries,parsed_Data);
    // console.log(parsed_Data.getElementsByTagName('non-called').toString);
     for(let i = 0 ; i < queries.data.length ; i++)
     {
      let dat = queries.data[i];
      let parse_Dat=parsed_Data;
      // console.log(dat)
      let out = checking(dat,parse_Dat);
      // console.log(out);
      console.log('query change');
      arr.push(out);
     }
     res.status(201).send(arr) ;
  }
}
// dom.window.document.getElementsByTagName("hr").length
// dom.window.document.getElementById("content").children.length
// document.getElementById(id)	Find an element by element id
// document.getElementsByTagName(name)	Find elements by tag name
// document.getElementsByClassName(name)
