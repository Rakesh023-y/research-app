const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const userRouter = require("./Routes/UserRoute");

require("dotenv").config();
require("./config/database").connect();

const app = express();
app.use(express.json({ limit: "50mb" }));
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST","PATCH","DELETE"],

  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));
//app.use(express.static('public'));

// app.get("/url", (req, res, next) => {
//     res.json(["Tony","Lisa","Michael","Ginger","Food"]);
//    });
app.use("/user", userRouter)

const server = http.createServer(app);
const { API_PORT } = process.env;
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
