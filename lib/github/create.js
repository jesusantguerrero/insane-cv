const axios = require('axios');

module.exports = function create(user, password, repo, options) {
 return axios
  .post('https://api.github.com/user/repos', {
    auth: {
      user: user,
      password: password
    },
    d: {
        name: repo
    }
  })
  .then((res) => {
   return res.data
  })
  .catch((err) => {
    return err
  })
}

