const express = require("express");
const router = express.Router();
const axios = require("axios");

git_client = {
   id: 'a1dc8059a2fe281dcb31',
   secret: 'ce7948563dc52a43c157bbd9a7f28157541bf0fb'
}

router.post('/', (request, response) => {
   axios.all([
      axios.get(`https://api.github.com/users/${request.body.name}?client_id=${git_client.id}&client_secret=${git_client.secret}`),
      axios.get(`https://api.github.com/users/${request.body.name}/repos?client_id=${git_client.id}&client_secret=${git_client.secret}`),
      axios.get(`https://api.github.com/users/${request.body.name}/followers?client_id=${git_client.id}&client_secret=${git_client.secret}`),
      axios.get(`https://api.github.com/users/${request.body.name}/following?client_id=${git_client.id}&client_secret=${git_client.secret}`),
      axios.get(`https://api.github.com/users/${request.body.name}/starred?client_id=${git_client.id}&client_secret=${git_client.secret}`)
   ])
   .then(axios.spread((profile, repos, followers, following, starredRepo) => {
      response.render('index', { 
         repos: filterReposData(repos),
         followers: filterFollowersData(followers),
         following: filterFollowingData(following),
         profile: returnProfileProps(profile),
         starredRepo: filterStarredRepoData(starredRepo),
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

// Returns profile data from the profile of user
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

// Filters and return user's repositories data
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

// Filters and returns user's followers data
filterFollowersData = (followers) => {
   return followers.data.map(follower => {
      return {
         login: follower.login,
         avatar_url: follower.avatar_url,
         html_url: follower.html_url
      }
   });
}

// Filters and returns user's following data
filterFollowingData = (following) => {
   return following.data.map(person => {
      return {
         login: person.login,
         avatar_url: person.avatar_url,
         html_url: person.html_url
      }
   });
}

// Filters and return user's starred repositories
filterStarredRepoData = (starredRepo) => {
   return starredRepo.data.map(repo => {
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

module.exports = router;
