const express = require("express");
const mongoose = require("mongoose");
const ProductRouter = require("./Routes/ProductRoute");
const CategoryRouter = require("./Routes/CategoryRoute");
const PORT = process.env.PORT || 3000;
const DBURL = process.env.DBURL || "mongodb://localhost:27017/testDb";
const app = express();

mongoose
  .connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/product", ProductRouter);
app.use("/category", CategoryRouter);

app.get("/", (req, res) => {
  res.send("Yo I'm Good And Running!!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
