const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const productRouter = require("./routers/productRouter");

app.use(cors());
app.use(bodyParser.json());

app.use("/api", productRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
