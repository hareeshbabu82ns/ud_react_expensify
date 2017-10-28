const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

//serve up the public directory
app.use(express.static(path.join(__dirname, "..", "public")));

//redirect all unmatched to index.html
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
);
app.listen(PORT, () => console.log(`Expensify is running on port: ${PORT}`));
