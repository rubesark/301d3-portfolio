var blogs = [];

function Blog (opts) {
  this.story = opts.story;
  this.title = opts.title;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Blog.prototype.toHtml = function() {
  var $newArticle = $('blog.template').clone();
  $newArticle.removeClass('template');
  if (!this.publishedOn) {
    $newBlog.addClass('draft');
  }

  $newBlog.attr('data-story', this.story);

    $newArticle.find('h1:first').html(this.title);
    $newArticle.find('.article-body').html(this.body);
    $newArticle.find('time[pubdate]').attr('datetime', this.publishedOn)
    $newArticle.find('time[pubdate]').attr('title', this.publishedOn)
    $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago')
    $newArticle.append('<hr>');
    return $newBlog;
  }
