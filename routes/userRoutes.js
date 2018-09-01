const express = require("express");
const router = express.Router();
const axios = require("axios");

let userName;

router.post('/', (request, response) => {
   axios.all([
      axios.get(`https://api.github.com/users/${request.body.name}?client_id=a1dc8059a2fe281dcb31&client_secret=ce7948563dc52a43c157bbd9a7f28157541bf0fb`),
      axios.get(`https://api.github.com/users/${request.body.name}/repos?client_id=a1dc8059a2fe281dcb31&client_secret=ce7948563dc52a43c157bbd9a7f28157541bf0fb`),
      axios.get(`https://api.github.com/users/${request.body.name}/followers?client_id=a1dc8059a2fe281dcb31&client_secret=ce7948563dc52a43c157bbd9a7f28157541bf0fb`),
      axios.get(`https://api.github.com/users/${request.body.name}/following?client_id=a1dc8059a2fe281dcb31&client_secret=ce7948563dc52a43c157bbd9a7f28157541bf0fb`)
   ])
   .then(axios.spread((profileRes, reposRes, followersRes) => {
      response.render('index', { 
         repos: filterReposData(reposRes),
         followers: filterFollowersData(followersRes),
         profile: returnProfileProps(profileRes),
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

returnProfileProps = (profile) => {
   return  {
      loginName: profile.data.login,
      email: profile.data.email,
      avatarUrl: profile.data.avatar_url,
      profileUrl: profile.data.html_url,
      name: profile.data.name,
      company: profile.data.company,
      blog: profile.data.blog,
      location: profile.data.location,
      bio: profile.data.bio,
      repos: profile.data.public_repos,
      followers: profile.data.followers,
      following: profile.data.following
   }
}

filterReposData = (repos) => {
   return repos.data.map(repo => {
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
}

filterFollowersData = (followers) => {
   return followers.data.map(follower => {
      return {
         login: follower.login,
         avatar_url: follower.avatar_url,
         html_url: follower.html_url
      }
   });
}

module.exports = router;