'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    recipes        = require('../controllers/recipes');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/', recipes.index);
  app.post('/recipes', recipes.create);
  app.delete('/recipes/:id', recipes.destroy);

  console.log('Routes Loaded');
};
