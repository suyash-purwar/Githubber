/*
 * This file is responsible for rendering HTML
 */

 function setRenderedHTML_ToDefault() {
     const imageContainer = document.getElementById("userimage_container");
     while (imageContainer.firstChild) {
         imageContainer.removeChild(imageContainer.firstChild);
     }

     document.querySelector("#bio").style.display = "block";
     document.getElementById("location_para").style.display = "block";
     document.getElementById("company_para").style.display = "block";
     document.getElementById("blog-container").style.display = "block";
 }

function renderHTML_Leftpart(user) {
   let imageTemeplate = "<img class = 'img-responsive' alt = '" + user.name + "' src = '" + user.avatar_url + "'>";
   document.getElementById("userimage_container").innerHTML += imageTemeplate;
   
   document.querySelector("#name").textContent = user.name;
   document.querySelector("#user_name").textContent = user.login;
   document.querySelector("#location").textContent = user.location;

   document.getElementById("visit_profile_button").innerHTML = "<a target = '_blank' href = '" + user.html_url + "'>Visit profile</a>";

   if (!user.bio) {
      document.querySelector("#bio").style.display = "none";
   } else {
      document.querySelector("#bio").textContent = user.bio;
   }

   if (user.location != null) {
      document.querySelector("#location").textContent = user.location;
   } else {
      document.getElementById("location_para").style.display = "none";
   }

   if (user.company != null) {
      document.querySelector("#company").textContent = user.company;
   } else {
      document.getElementById("company_para").style.display = "none";
   }

   if (user.blog.trim() == "") {
      document.getElementById("blog-container").style.display = "none";
   } else {
      document.getElementById("blog-container").innerHTML = "<span><i class = 'fa fa-link' style = 'padding-right: 5px;font-size: 18px'></i><a href = '" + user.blog + "'>" + user.blog + "</a></span>";
   }

   document.getElementById("userprofile-container").style.display = "block";
}

function renderProjectAboutSection(language, stargazers_count, forks_count, license, id) {
   if (language !== null) {
      document.querySelector('#'+id+'a').textContent = language;
   } else {
      document.getElementById(id+'a').style.display = "none";
   }

   if (stargazers_count) {
      document.querySelector('#'+id+'b').textContent = language;
   } else {
      document.getElementById(id+'b').style.display = "none";
   }

   if (forks_count) {
      document.querySelector('#'+id+'c').textContent = language;
   } else {
      document.getElementById(id+'c').style.display = "none";
   }

   if (license !== null) {
      document.querySelector('#'+id+'d').textContent = license.spdx_id;
   } else {
      document.getElementById(id+'d').style.display = "none";
   }
}

function removeModalIfVerified() {
	// Hide searchUserModal after sending user name to applicationCache.js
	const userSearchModalInstance = M.Modal.getInstance(document.querySelector("#searchUserModal"));
	userSearchModalInstance.close();
	// Sets the input field empty
	document.querySelector("#userNameInput").value = "";
}

function renderUserRepos(repos) {
	let a = b = c = d = 1;
	repos.repos.forEach((repo) => {
	   let htmlRepoTemplate =  `<div class = "row">
								  <div class = "col s10">
									 <div style = "padding: 10px 0px;>
										<p class = "project_name">${repo.name}</p>
										<p class = "project_description">${repo.description}</p>

										<p id = "project_about">
										   <span id = "language" id = "${a}a"></span>
										   <span id = "stargazers" id = "${b}b"></span>
										   <span id = "forks" id = "${c}c"></span>
										   <span id = "license" id = "${d}d"></span>
										</p>
									 </div>
								  </div>
								  <div class = "col s2>
									 <button class = "btn repo_link_button btn-waves">
										<a href = "${repo.html_url}">Visit page</a>
									 </button>
								  </div>
							   </div>`;
	   a++; b++; c++; d++;

	   document.getElementById("repos").innerHTML += htmlRepoTemplate;
	   renderProjectAboutSection(repo.language, repo.stargazers_count, repo.forks, repo.license, a);
	});
}