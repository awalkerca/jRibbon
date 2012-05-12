$(document).ready(function(){
  $('header').ribbon();
  $('h2').ribbon({
     triangle_width: 8
  });

  $('.download_bar li a').ribbon({
    ends: 'right'
  });
});