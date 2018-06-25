const socket = io("http://localhost:3000");

// Function for opening the Username input modal
document.addEventListener('DOMContentLoaded', () => {
   const userSearchModal = document.querySelector("#searchUserModal");
   const instances = M.Modal.init(userSearchModal, {});
});

// Socket listening for any error alerts
// This function is used to show modal for showing erros that can be solved by users
socket.on("sendError", (data) => {
	// Sets the data on modal
   document.querySelector("#errorTitle").textContent = data.cause;
   document.querySelector("#errorDescription").textContent = data.causeDescription;

   // Opens modal
   const errorModalInstance = M.Modal.init(document.querySelector("#showErrorModal"), {});
   errorModalInstance.open();

   // Remove modal after 3 sec
   setTimeout(() => {
      errorModalInstance.close();
   }, 3000);
});

// This gets executed when search icon is clicked
document.querySelector("#userNameFetch").addEventListener('click', () => {
      // Sending user name to app.js for fetching the profile of person
	socket.emit("sendUserName", { 
		name: document.querySelector("#userNameInput").value
      });
      // This function removes the modal after sending user name
	removeModalIfVerified();

      // This socket tells app.js to make a request to github server's for fetching user's repositories
	socket.emit("sendRequestForRepos", {});
});

// This function gets executed only and only when the user is found on github servers
socket.on("sendFetchedData", (data) => {
	/*
	 * If the name of user's profile is not specified
	 * Then login name will be used to show it on HTML page
	 */
	let name = data.quickUserName ? data.quickUserName : data.loginName;

	// Setting the name on HTML page
	document.querySelector("#successTitle").textContent = `Welcome ${name}`;
	document.querySelector("#successDescription").textContent = `Hurree... We found you on github!!`

	// Opens the modal for showing success message
	const successModalInstance = M.Modal.init(document.querySelector("#showSuccessModal"), {});
	successModalInstance.open();

	// Removes the modal after 2 sec
	setTimeout(() => {
		successModalInstance.close();
	}, 2000);

	/*
	 * This will set the previously rendered HTML to default
	 * Doesn't to much work but it is very important
	 */
	setRenderedHTML_ToDefault();

	// This will render the HTML 
	renderHTML_Leftpart(data.userProfile);
});


// Getting user repos from app.js and rendering it
// This is responsible for rendering HTML
socket.on("sendFetchedRepos", (repos) => {
	console.log("rendering html");
    renderUserRepos(repos.repos);
});