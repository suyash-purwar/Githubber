const express = require("express");
const bodyParser = require("body-parser");

const fetchID = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/fetchID', fetchID);
app.set('view engine', "ejs");

app.get('/', (req, res) => {
	res.render("index.ejs", {
		isVisible: false,
		showErrorModal: undefined,
		showSuccessModal: undefined,
		isHome: true,
	});
});

app.listen(port, () => {
	console.log("Server is up on port 3000");
});