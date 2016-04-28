var blogView = {};

blogView.populateFilter = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      val = $(this).find('address a').text();
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#story-filter option[value="' + val + '"]').length === 0) {
        $('#story-filter').append(optionTag);
      }
    }
  });
};

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

blogView.setTeasers = function() {
  $('.blog-body *:nth-of-type(n+2), .blog-body img').hide();


  $('#blog').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    console.log('clicked on this');
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });

};

blogView.initIndexPage = function() {
  Blog.all.forEach(function(a){
    $('#blog').append(a.toHtml())
  });

  blogView.populateFilter();
  blogView.handleStoryFilter();
  blogView.setTeasers();
};
