var blogView = {};

blogView.setTeasers = function() {
  $('.blog-body *:nth-of-type(n+2)').hide();


  $('blogs').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  })

};

$(document).ready(function () {
  articleView.setTeasers();
});
