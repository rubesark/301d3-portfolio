(function(module) {
  var blog = {};
  blog.property = 'property';

  function Blog (opts) {
  this.story = opts.story;
  this.title = opts.title;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
  this.class = opts.class;
}

Blog.all = []

Blog.prototype.toHtml = function() {
  var template = Handlebars.compile($('#blog-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  return template(this);
};

Blog.loadAll = function(dataPassedIn) {
  dataPassedIn.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  Blog.all = dataPassedIn.map(function(ele) {
    return new Blog(ele);
    });
  };

//Making an ajax call that looks to my json file which has all of the data that I wish to show on my page and loads it into my local storage.
Blog.fetchAll = function(callback) {
  if (localStorage.blogStory) {
    $.ajax({
      type: 'HEAD',
      url: 'data/blogStory.json',
      success: function(data, message, xhr) {
        var eTag = xhr.getResponseHeader('eTag');
        if (!localStorage.eTag || eTag!== localStorage.eTag) {
            localStorage.eTag = eTag;
            Blog.getAll();
        } else {
          Blog.loadAll(JSON.parse(localStorage.blogStory));
          callback();
        }
      }
    });

  } else {
    Blog.getAll();
  }
};

Blog.getAll = function() {
  $.getJSON('data/blogStory.json', function(responseData) {
    Blog.loadAll(responseData);
    localStorage.blogStory = JSON.stringify(responseData);
    blogView.initIndexPage();
  });
};

//Creating a function that maps through my articles and finds the number of words that each article has.
Blog.numWordsAll = function() {
  return Blog.all.map(function(article) {
    return article.body.match(/\b\w+/g).length;
  })
  .reduce(function(a, b) {
    return a + b;
  });
};

module.Blog = Blog;

}) (window);
