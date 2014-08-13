(function(){
  'use strict';

  $(document).ready(function(){
    $('#hide').click(hide);
    $('#show').click(show);
    $('form').submit(addRecipe);
    $('#recipes').on('click', '.delete', delRecipe);
    $('#categories a').click(filterCategory);
    $('#ingredients a').click(filterIngredient);
  });

  function filterIngredient(e){
    var ingredient = $(this).text();
    $('.recipe .ingredients:contains('+ingredient+')').closest('.recipe').show();
    $('.recipe .ingredients:not(:contains('+ingredient+'))').closest('.recipe').hide();
    e.preventDefault();
  }

  function filterCategory(e){
    var category = $(this).text();
    $('.recipe .category:contains('+category+')').closest('.recipe').show();
    $('.recipe .category:not(:contains('+category+'))').closest('.recipe').hide();
    e.preventDefault();
  }

  function delRecipe(){
    var id = $(this).closest('.recipe').attr('data-recipe-id'),
        type = 'delete',
        url = '/recipes/' + id;

    $.ajax({url:url, type:type, dataType:'json', success:function(data){
      var $recipe = $('.recipe[data-recipe-id='+data.id+']');//this removes the item from the page
      $recipe.fadeOut();

      setTimeout(function(){$recipe.remove();}, 2000);
    }});
  }

  function addRecipe(e){
    var data = $('form').serialize(),
        type = $('form').attr('method'),
        url  = $('form').attr('action');

      //clearing form
    $('input, textarea').val('');
    hide();

    $.ajax({url:url, type:type, data:data, dataType:'html', success:function(html){
      var $recipe = $(html);
      $recipe.css('display', 'none');
      $('#recipes').prepend($recipe);
      $recipe.fadeIn(2000);
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
