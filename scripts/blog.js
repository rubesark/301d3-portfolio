var blogs = [];

function Blog (opts) {
  this.subject = opts.author;
  this. title = opts.title;
  this.body = opts.body;
  this.publushedOn = opts.publishedOn;
}

Blog.prototype.toHtml = function() {
  var $newArticle = $('blog.template').clone();
  $newArticle.removeClass('template');
  if (!this.publishedOn) {
    $newBlog.addClass('draft');
  }
