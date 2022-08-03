import { IncomingMessage, Server, ServerResponse } from "node:http";
const http = require("node:http");
const {
  getInfo,
  getOneInfo,
  createOrganization,
  updateOrganization,
  removeOrganization,
} = require("./controllers/infoControllers");

/*
implement your server code here
*/

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET" && req.url === "/api/info") {
      getInfo(req, res);
    } else if (
      req.url?.match(/\/api\/info\/([0-9]+)/) &&
      req.method === "GET"
    ) {
      const id = req.url.split("/")[3];
      getOneInfo(req, res, id);
    } else if (req.url === "/api/org" && req.method === "POST") {
      createOrganization(req, res);
    } else if (
      req.url?.match(/\/api\/org\/([0-9]+)/) &&
      req.method === "PATCH"
    ) {
      const id = req.url.split("/")[3];
      updateOrganization(req, res, id);
    } else if (
      req.url?.match(/\/api\/org\/([0-9]+)/) &&
      req.method === "DELETE"
    ) {
      const id = req.url.split("/")[3];
      removeOrganization(req, res, id);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Routes Not Found" }));
    }
  }
);

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});