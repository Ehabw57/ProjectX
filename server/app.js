const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ProductRouter = require("./Routes/ProductRoute");
const CategoryRouter = require("./Routes/CategoryRoute");
const PORT = process.env.PORT || 3000;
const DBURL = process.env.DBURL || "mongodb://localhost:27017/testDb";
const app = express();
const viewRoutes = require("./Routes/viewRoutes");
const path = require("path");
mongoose
  .connect(DBURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

dotenv.config();
///
const { engine } = require("express-handlebars");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partial"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
///
app.use(express.json());
app.use("/product", ProductRouter);
app.use("/category", CategoryRouter);
app.use("/view", viewRoutes);

app.get("/", (req, res) => {
  res.send("Yo I'm Good And Running!!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
