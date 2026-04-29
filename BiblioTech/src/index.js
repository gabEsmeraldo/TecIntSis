const express = require("express");
const dotenv = require("dotenv").config();
const supabase = require("./config/database");
const cors = require("cors");
import livroRoutes from "./routes/livroRoutes";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
(app.get("/"),
  (req, res) => {
    res.send("Hello World!");
  });

app.use("/livros", livroRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
