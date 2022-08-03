"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const { scrapper } = require("./infoControllers/controllers");
const url = require("node:url");
/*
implement your server code here
*/
const server = http_1.default.createServer((req, res) => {
    const obj = url.parse(req.url, true);
    const link = obj.query.url;
    if (link && req.method === "GET") {
        scrapper(req, res, link);
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid Request" }));
    }
});
server.listen(3001);
