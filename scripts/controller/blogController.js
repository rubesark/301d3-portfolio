(function(module) {
  var blogsController = {};

  blogsController.index = function(ctx, next) {
    blogView.index(ctx.blogs);
  };

  //   Blog.fetchAll(blogView.initIndexPage);
  //
  //   $('main > section').hide();
  //   $('#blog').show();
  // };
  //
  
  blogsController.loadAll = function(ctx, next) {
    var blogData = function(allBlogs) {
      ctx.articles = Blog.all;
      next();
    };

    if (Blog.all.length) {
      ctx.blogs = Blog.all;
      next();
    } else {
      Blog.fetchAll(blogData);
    }
  };

  module.blogsController = blogsController;
})(window);
