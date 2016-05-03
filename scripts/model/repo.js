(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    console.log(callback);
    $.ajax({
      url: 'https://api.github.com/users/rubens23/repos' +
      '?per_page=30' +
      '&sort=updated',
      type: 'GET',
      headers: {
        'Authorization': 'token ' + githubToken
      },
      success: function(data) {
        repos.all = data.map(function(attr) {
          return attr;
        });
        callback();
      }
    })
  };

  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
