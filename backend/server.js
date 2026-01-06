const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/products", require("./routes/productRoutes"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
