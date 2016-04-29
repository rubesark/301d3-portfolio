(function(module) {
  var blogsController = {};

  blogsController.index = function() {

    Blog.fetchAll(blogView.initIndexPage);

    $('main > section').hide();
    $('#blog').show();
  };

  module.blogsController = blogsController;
})(window);
