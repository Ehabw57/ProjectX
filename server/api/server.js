const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const ProductRouter = require("../Routes/ProductRoute");
const CategoryRouter = require("../Routes/CategoryRoute");
const viewRoutes = require("../Routes/viewRoutes");
const path = require("path");
const fs = require("fs");
const serverless = require("serverless-http");

dotenv.config();

const app = express();

const DBURL = process.env.DBURL;
mongoose
  .connect(DBURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const { engine } = require("express-handlebars");
const indexPath = path.join(__dirname, "../public/index.html");
let indexHTML = fs.readFileSync(indexPath, "utf-8");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "../views/layouts"),
    partialsDir: path.join(__dirname, "../views/partial"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.json());
app.use(cors());
app.use("/", viewRoutes);
app.use(express.static(path.join(__dirname, "../public")));
app.use("/product", ProductRouter);
app.use("/category", CategoryRouter);

app.get("/admin", (req, res) => {
  console.log("Admin route accessed");
  const updatedIndex = indexHTML.replace(
    "__SERVERDATA__",
    `"${process.env.APIURL}"`
  );
  res.send(updatedIndex);
});

module.exports = app;
module.exports.handler = serverless(app);
