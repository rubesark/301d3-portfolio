(function(module) {

var blogView = {};

var render = function(blog) {
  var template = Handlebars.compile($('#blog-template').text());

  blog.daysAgo = parseInt((new Date() - new Date(blog.publishedOn))/60/60/24/1000);
  blog.publishStatus = blog.publishedOn ? 'published ' + blog.daysAgo + ' days ago' : '(draft)';
  blog.body = marked(blog.body);

  return template(blog);
};

// Added a method to the empty blogView object called populateFilter. Inside there are two variables: options and template
// which are equal to the Handlebars compiler which is grabbing the class option-template and populating the handlebars script in
// the head portion of my index.html. Then it calls the options variable setting it equal to the .allAuthors method which is then mapped
// by author and then returns a template for the handlebars script setting the value equal to the author. Which again is put into
// the index.html template to display on the webpage. Then I run an if statement to remove any duplicate authors found in my filter.
// Then append the class author filter to options.
blogView.populateFilter = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      val = $(this).attr('data-story');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#story-filter option[value="' + val + '"]').length === 0) {
        $('#story-filter').append(optionTag);
      }
    }
  });
};

  // Now instantiate a new method on the articleView object. I select my filters class and use an event that cycles through
  // it and whichever option you choose in the filter menu, It will fadeIn that particlur story and hide all the others that
  // are not selected.
blogView.handleStoryFilter = function() {
    $('#story-filter').on('change', function () {
      if ($(this).val()) {
        $('article').hide();
        $('article[data-story= "' + $(this).val() + '"]').fadeIn();
      } else {
        $('article').fadeIn();
        $('article.template').hide()
      }
    })
};

blogView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

//Making a seatTeasers function that shows only a section of my articles until you click the read-on links and the articles expands to full view.
// blogView.setTeasers = function() {
//   $('.blog-body *:nth-of-type(n+2), .blog-body img').hide();
//
//
//   $('#blog').on('click', 'a.read-on', function(e) {
//     e.preventDefault();
//     console.log('clicked on this');
//     $(this).parent().find('*').fadeIn();
//     $(this).hide();
//   });
//
// };

// blogView.initIndexPage = function() {
//   Blog.all.forEach(function(a){
//     $('#blog').append(a.toHtml())
//   });

  blogView.index = function(blogs) {
      $('#blog').show().siblings().hide();

      $('#blog article').remove();
      blogs.forEach(function(a) {
        $('#blog').append(render(a));
      });

      blogView.populateFilter();
      blogView.handleStoryFilter();

      if ($('#blog article').length > 1) {
        $('.blog-body *:nth-of-type(n+2) .blog-body img').hide();
    }
  };


// Now calling the handleStoryFilter and populateFilter functions listed above. Both methods track back through when I first
// instantiated each function up above.
//   blogView.populateFilter();
//   blogView.handleStoryFilter();
//   blogView.setTeasers();
// };

module.blogView = blogView;
})(window);
