const express = require("express");
const router = express.Router();
const axios = require("axios");

userProfileURL = (user) => {
   return `https://api.github.com/users/${user}?client_id=a1dc8059a2fe281dcb31&client_secret=ce7948563dc52a43c157bbd9a7f28157541bf0fb`
}

router.post('/', (request, response) => {
   axios.get(userProfileURL(request.body.name))
   .then((res) => {
      console.log(res.data);
      if (typeof res.data === 'object') {
         response.render('index', {
            data: {
               loginName: res.data.login,
               email: res.data.email,
               avatarUrl: res.data.avatar_url,
               profileUrl: res.data.html_url,
               name: res.data.name,
               company: res.data.company,
               blog: res.data.blog,
               location: res.data.location,
               bio: res.data.bio,
               repos: res.data.public_repos,
               followers: res.data.followers,
               following: res.data.following
            },
            isVisible: true,
            type: 'success',
            showSuccessModal: true,
            showErrorModal: false
         });
      }

   })
   .catch((e) => {
      response.render('index', {
         type: 'Error',
         isVisible: false,
         showErrorModal: true,
         showSuccessModal: false,
         errorTitle: "Awww... Something went wrong",
         errorDescription: 'Check your internet connection and the name you entered'
      })
   });
});

module.exports = router;
