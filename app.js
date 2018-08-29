const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();

// Setting view engine
app.set('view engine', "ejs");
// Setting static folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting routes
const userRoutes = require("./routes/userRoutes");

app.use(userRoutes, '/fetchUserName');

// Setting port
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Server is up on port 3000");
});

app.get('/', (req, res) => {
	res.render("index.ejs");
});

