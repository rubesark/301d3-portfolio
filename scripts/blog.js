var blogs = [];

function Blog (opts) {
  this.story = opts.story;
  this.title = opts.title;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
  this.class = opts.class;
}

Blog.prototype.toHtml = function() {
  var $source = $('#blog-template').html();
  var template = Handlebars.compile($source);

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  return template(this);
};

  storyData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  storyData.forEach(function(ele) {
    blogs.push(new Blog(ele));
  })

  blogs.forEach(function(a){
    $('#blog').append(a.toHtml())
  });
