import http, { IncomingMessage, Server, ServerResponse } from "http";
const { scrapper } = require("./infoControllers/controllers");
const url = require("node:url");
/*
implement your server code here
*/

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const obj = url.parse(req.url, true);
    const link = obj.query.url;

    if (link && req.method === "GET") {
      scrapper(req, res, link);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid Request" }));
    }
  }
);

server.listen(3001);