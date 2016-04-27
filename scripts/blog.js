function Blog (opts) {
  this.story = opts.story;
  this.title = opts.title;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
  this.class = opts.class;
}

Blog.all = []

Blog.prototype.toHtml = function() {
  var $source = $('#blog-template').html();
  var template = Handlebars.compile($source);

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  return template(this);
};

Blog.loadAll = function(dataPassedIn) {
  dataPassedIn.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });
  dataPassedIn.forEach(function(ele) {
    Blog.all.push(new Blog(ele));
  });
};

Blog.fetchAll = function() {
  if (localStorage.blogStory) {
    $.ajax({
      type: 'HEAD',
      url: 'data/blogStory.json',
      success: function(data, message, xhr) {
        var eTag = xhr.getResponseHeader('eTag');
        if (eTag !== localStorage.eTag) {
          $.getJSON('data/blogStory.json', function(data) {
            Blog.loadAll(data);
            localStorage.blogStory = JSON.stringify(Blog.all);
          localStorage.eTag = JSON.stringify(eTag);
          blogView.initIndexPage();
        });
        } else {
          Blog.loadAll(JSON.parse(localStorage.blogStory));
          blogView.initIndexPage();
        }
      }
    });

  } else {
    $.ajax({
      type: 'HEAD',
      url: 'data/blogStory.json',
      success: function(data, message, xhr) {
        var eTag = xhr.getResponseHeader('eTag');
        localStorage.eTag = JSON.stringify(eTag);
      }
    });
    $.getJSON('data/blogStory.json', function(data){
    Blog.loadAll(data);
    localStorage.blogStory = JSON.stringify(Blog.all);
    blogView.initIndexPage();
  });
  }
};
