const express = require("express");
const router = express.Router();
const axios = require("axios");

let userName;

router.post('/', (request, response) => {
   axios.all([
      axios.get(`https://api.github.com/users/${request.body.name}?client_id=a1dc8059a2fe281dcb31&client_secret=ce7948563dc52a43c157bbd9a7f28157541bf0fb`),
      axios.get(`https://api.github.com/users/${request.body.name}/repos?client_id=a1dc8059a2fe281dcb31&client_secret=ce7948563dc52a43c157bbd9a7f28157541bf0fb`),
      axios.get(`https://api.github.com/users/${request.body.name}/followers?client_id=a1dc8059a2fe281dcb31&client_secret=ce7948563dc52a43c157bbd9a7f28157541bf0fb`)
   ])
   .then(axios.spread((profileRes, reposRes, followersRes) => {
      const res = profileRes;
      const repos = reposRes.data.map(repo => {
         return {
            name: repo.name,
            url: repo.html_url,
            description: repo.description,
            language: repo.language,
            forks_count: repo.forks_count,
            stargazers_count: repo.stargazers_count,
            watchers_count: repo.watchers_count
         }
      });
      
      const followers = followersRes.data.map(follower => {
         return {
            login: follower.login,
            avatar_url: follower.avatar_url,
            html_url: follower.html_url
         }
      });
      console.log(followers);

      response.render('index', { 
         repos: repos,
         followers: followers,
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
   }))
   .catch((e) => {
      response.render('index', {
         type: 'Error',
         isVisible: false,
         showErrorModal: true,
         showSuccessModal: false,
         errorTitle: "Awww... Something went wrong",
         errorDescription: 'Check your internet connection and the name you entered'
      });

      console.log(e);
   });
});

module.exports = router;