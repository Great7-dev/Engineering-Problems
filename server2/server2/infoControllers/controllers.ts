import { IncomingMessage, ServerResponse } from "http";
const Schema = require("../infoModel/models");

async function scrapper(
  req: IncomingMessage,
  res: ServerResponse,
  url: string
) {
  try {
    const result = await Schema.getScrapper(url);
    res.end(JSON.stringify(result));
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  scrapper,
};