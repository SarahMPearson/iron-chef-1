'use strict';

function Recipe(o){
  this.name        = o.name;
  this.photo       = o.photo;
  this.directions  = o.directions;
  this.ingredients = o.ingredients.split(',').map(function(i){return i.trim();});
}

Object.defineProperty(Recipe, 'collection', {
  get: function(){return global.mongodb.collection('recipes');}
});

Recipe.all = function(cb){
  Recipe.collection.find().toArray(cb);
};

Recipe.create = function(o, cb){
  var r = new Recipe(o);
  Recipe.collection.save(r, cb);
};

module.exports = Recipe;
