(function(){
  'use strict';

  $(document).ready(function(){
    $('#hide').click(hide);
    $('#show').click(show);
    $('form').submit(addRecipe);
  });

  function addRecipe(e){
    var data = $('form').serialize(),
        type = $('form').attr('method'),
        url  = $('form').attr('action');

      //clearing form
      $('input, textarea').val('');
       hide();

    $.ajax({url:url, type:type, data:data, dataType:'html', success:function(html){
      $('#recipes').prepend(html);
    }});

    e.preventDefault();
  }

  function hide(){
    $('form').fadeOut();
  }

  function show(){
    $('form').fadeIn();
  }

})();
