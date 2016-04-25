var blogView = {};

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

blogView.setTeasers = function() {
  $('.blog-body *:nth-of-type(n+2)').hide();


  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  })

};

$(document).ready(function () {
  blogView.populateFilter();
  blogView.handleStoryFilter();
  blogView.setTeasers();
});
