const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const axios = require("axios");

// Setting port
const port = process.env.PORT || 3000;
server.listen(port);
// Setting static folder
app.use(express.static("public"));

/*
 * This object is created to store user name.
 * This data will be used to specify user each time we request to github for data.
 * This variable is global so that it can be used by every socket.
 * 'sendUserName' socket sets value in this object's property (name).
 */
const userName = {
   name: null
};

io.on('connection', (socket) => {
	socket.on("sendUserName", (data) => {
		userName.name = data.name;

		axios.get(`https://api.github.com/users/${userName.name}?client_id=a1dc8059a2fe281dcb31&client_secret=ce7948563dc52a43c157bbd9a7f28157541bf0fb`)
		.then((userData) => {
			socket.emit("sendFetchedData", {
				userProfile: userData.data,
				quickUserName: userData.data.name,
				loginName: userData.data.login
			});
		})
		.catch((err) => {
			if (err.response == undefined) {
				socket.emit("sendError", {
					cause: "No Internet connection",
					causeDescription: "We are unable to connect to github servers."
				});
			} else {
				socket.emit("sendError", {
					cause: "User not found",
					causeDescription: "We are unable to find you. Check user name please."
				});
			}
		});
	});

	socket.on("sendRequestForRepos", (data) => {
		// Fetching user repositories just after identifying the user and rendering its profile
		axios.get(`https://api.github.com/users/${userName.name}/repos?client_id=a1dc8059a2fe281dcb31&client_secret=ce7948563dc52a43c157bbd9a7f28157541bf0fb`)
		.then((repos) => {
			socket.emit("sendFetchedRepos", {repos:repos});
		})
		.catch((err) => {
			if (err.response == undefined) {
				socket.emit("sendError", {
					cause: "No Internet connection",
					causeDescription: "We are unable to connect to github servers. Failed to fetch your repositories"
				});
			} else {
				socket.emit("sendError", {
					cause: "User not found",
					causeDescription: "We are unable to find you. Check user name please."
				});
			}
		});
	});

});


