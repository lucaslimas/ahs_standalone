require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
// const http = require("http");

const server = express();

server.use(express.json());
server.use(cors());
server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({ limit: "50mb" }));

const routes = new express.Router();

const appDir = path.resolve(`app/${process.env.APP_VERSION}`);

server.use(express.static(appDir));

server.get("/server_url", function (req, res) {
  res.send(process.env.SERVER_URL);
});

routes.get("/test", (req, res) => res.send("Server Standalone is running..."));

server.get("/*", function (req, res) {
  res.sendFile(path.join(appDir, "index.html"));
});

server.use(routes);

const privateKey = fs.readFileSync(
  path.resolve(`cert/certificate.key`),
  "utf8"
);

const certificate = fs.readFileSync(
  path.resolve(`cert/certificate.crt`),
  "utf8"
);

const credentials = { key: privateKey, cert: certificate };

/* 
const httpServer = http.createServer(server);
httpServer.listen(process.env.PORT, async () => {
  console.log(`Server listening to port http://localhost:${process.env.PORT}`);
}); 
*/

const httpsServer = https.createServer(credentials, server);
httpsServer.listen(process.env.PORT, async () => {
  console.log(`Server listening to port https://localhost:${process.env.PORT}`);
});
