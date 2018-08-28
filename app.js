const express = require("express");
const app = express();
const axios = require("axios");

// Setting view engine
app.set('view engine', "ejs");
// Setting static folder
app.use(express.static("public"));

// Setting port
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Server is up on port 3000");
});

app.get('/', (req, res) => {
	res.render("index.ejs");
});


