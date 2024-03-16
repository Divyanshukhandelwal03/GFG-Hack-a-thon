import { parse } from "node-html-parser";
import { checking } from "./checking.js";
import *as fs from "fs";
// jsdom
import { parseStrToObj } from "../../../string_to_obj/conversion.js";
import { JSDOM } from "jsdom";
//repository
import htmlParserGFG from "./htmlParse.repository.js";
import { ObjectId } from "mongodb";
export default class HtmlParseController {
  constructor() {
    this.htmlParserGfg = new htmlParserGFG();
  }
  
  async displayQueryForm(req,res){
    return res.render("input_screen");
  }
  async displayForm(req, res) {
    const queries = await this.htmlParserGfg.get(req.params.id);
    if(queries)
    {
      return res.render("form_input",{id:req.params.id,query:queries.userView});
    }
    
      res.status(500).send("invalid user");
    
  }
  async accessHtmlCode(req,res){
    const arr= [];
    
    const queries = await this.htmlParserGfg.get(req.params.id);
    const parsed_Data = parse(req.body.desc);
    let lines = queries.userView.split(/\r?\n/);
    let ansu = [];
    for(let i = 0 ; i < queries.data.length ; i++)
    {
     let dat = queries.data[i];
     let parse_Dat=parsed_Data;
     let out = checking(dat,parse_Dat);
    let ans="";
    ans+=lines[i];
    ans+='=';
    ans+=Boolean(out);
    ansu.push(ans);
    }
    return res.status(201).send(ansu) ;
  }
  async checkTheCode(req, res) {
    try {
      const data = await this.htmlParserGfg.get(req.params.id);
    } catch (err) {
      // console.log(err);
      return res.status(500).send("something went wrong");
    }
  }
  async developQueryCode_t(req,res){
  let userView = req.body.query_text;
  let query_string = req.body.query_in_string;
  let data = parseStrToObj(query_string);
  try{
    const output = (await this.htmlParserGfg.add({data,userView}));
    res.render("form_after_query",{output});
   }catch(err)
   {
    //  console.log('data recieved in query can not be added in the database');
     return res.status(500).send('something went wrong');
   }
  }
  async developQueryCode(req,res){
     try{
      const output = await this.htmlParserGfg.add(req.body.data);
      res.render("form_after_query",{output});
     }catch(err)
     {
      //  console.log('data recieved in query can not be added in the database');
       return res.status(500).send('something went wrong');
     }
  }
  
  async checkCodeWithQuery(req,res){
    const arr= [];
    
     const queries = await this.htmlParserGfg.get(req.params.id);
     const parsed_Data = parse(req.body.data);
     for(let i = 0 ; i < queries.data.length ; i++)
     {
      let dat = queries.data[i];
      let parse_Dat=parsed_Data;
      let out = checking(dat,parse_Dat);
      arr.push(out);
     }
     res.status(201).send(arr) ;
  }
}

