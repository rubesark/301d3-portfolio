var blogs = [];

function Blog (opts) {
  this.story = opts.story;
  this.title = opts.title;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
  this.class = opts.class;
}

Blog.prototype.toHtml = function() {
  var $newBlog = $('article.template').clone();
  $newBlog.removeClass('template');
  if (!this.publishedOn) {
    $newBlog.addClass('draft');
  }

  $newBlog.attr('data-story', this.story);

    $newBlog.find('h1:first').html(this.title);
    $newBlog.find('.blog-body').html(this.body);
    $newBlog.find('time[pubdate]').attr('datetime', this.publishedOn)
    $newBlog.find('time[pubdate]').attr('title', this.publishedOn)
    $newBlog.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago')
    $newBlog.append('<hr>');
    $newBlog.addClass(this.class);
    return $newBlog;
  }

  storyData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  storyData.forEach(function(ele) {
    blogs.push(new Blog(ele));
  })

  blogs.forEach(function(a){
    $('#blog').append(a.toHtml())
  });
