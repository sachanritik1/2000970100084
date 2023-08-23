const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ msg: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}....`);
});
