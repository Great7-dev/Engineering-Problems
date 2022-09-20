import { Http2ServerRequest } from "http2";

const cheerio = require("cheerio");
const http = require("node:https");
const axios = require("axios");

interface Result {
  title: string;
  description: string;
  images: string[];
}
async function getScrapper(url: string) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  let result: Result = {
    title: "No title found",
    description: "No description",
    images: [],
  };
  const $title = $("title").text();
  const $description = $('meta[name="description"]').attr("content");
  const $image = $("img");

  if ($title) {
    result.title = $title;
  }
  if ($description) {
    result.description = $description;
  }
  if ($image) {
    $('img').each((index:number, image:any)=>{
        let imgSrc = $(image).attr('src');
        result.images.push(imgSrc);
    })
} 
  return result;
}
module.exports = {
  getScrapper,
};