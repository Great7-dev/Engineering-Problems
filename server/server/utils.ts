const fs = require("fs");
import { IncomingMessage } from "node:http";

export function writeDataToFile(filename: any, content: any) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err: any) => {
    if (err) {
      console.log(err);
    }
  });
}

export function getPostData(req: IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk: Buffer) => {
        body += chunk;
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}