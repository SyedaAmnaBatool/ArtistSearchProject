const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || "8000";
//var bootstrap = require("bootstrap");

app.use(express.static('assets'));

app.get("/", (req, res) => {
res.sendFile("index.html", { root: "." });
});


app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
