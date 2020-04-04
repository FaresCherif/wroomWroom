// ////////////////////// L I S T E R     C I R C U I T S

let model = require('../models/circuit.js');
let async=require('async');
var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs = require('fs-extra'),
    path = require("path");

module.exports.ListerCircuit = function(request, response){
  var connect = request.cookies.connect;

  if(connect=="true"){
  response.title = 'Liste des circuits';
    model.getListeVille( function (err, result) {

      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listeCircuit = result;


    response.render('listerCircuit', response);
    });
  }
  else{
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

    response.render('home', response);
  }
}

module.exports.AjouterCircuit = function(request, response){
  var connect = request.cookies.connect;

  if(connect=="true"){
  response.title = 'Liste des circuits';



    model.getListePays( function (err, result) {

      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listePays = result;


    response.render('ajouterCircuit', response);
    });
  }
  else{
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

    response.render('home', response);
  }
}

module.exports.modifierCircuit = function(request, response){
  var connect = request.cookies.connect;

  if(connect=="true"){
  let data = request.params.num;
  response.title = 'Description des circuits';

      async.parallel (
        [
         function(callback){
           model.getDescriptionCircuit(data, (function (err, result){ callback(null,result)}));
         },
         function(callback){
           model.getListePays( (function (err, result){callback(null,result)}));
         },
       ],


       function(err,result){

         if (err) {
             // gestion de l'erreur
             console.log(err);
             return;
         }

      response.circuit = result[0][0];
      response.listePays = result[1];


      console.log(response.circuit);
    response.render('modifierCircuit', response);
  }
  );
}
else{
  response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

  response.render('home', response);
}
  };

module.exports.FinirAjouterCircuit = function(request, response){
  var connect = request.cookies.connect;

  if(connect=="true"){
  let img=request.files.img;

  response.title = 'Liste des circuits';

   img.mv('.\\public\\image\\ecurie\\' + img.name);


    model.ajouterCircuit(request.body.parcourir,request.body.nom,request.body.nationalite,request.body.longueur,request.body.nbspectateur,request.body.description, function (err, result) {
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listePays = result;


    response.render('validationAjoutCircuit', response);
    });
  }
  else{
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

    response.render('home', response);
  }
}

module.exports.FinirModifierCircuit = function(request, response){
  var connect = request.cookies.connect;

  if(connect=="true"){

  response.title = 'Liste des circuits';

  console.log(path);


    model.modifierCircuit(request.body.num,request.body.parcourir,request.body.nom,request.body.nationalite,request.body.longueur,request.body.nbspectateur,request.body.description, function (err, result) {

      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listePays = result;


    response.render('validationAjoutCircuit', response);
    });
  }
  else{
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

    response.render('home', response);
  }
}

module.exports.DescriptionCircuit = function(request, response){
  var connect = request.cookies.connect;

  if(connect=="true"){
  let data = request.params.num;
  response.title = 'Description des circuits';

      async.parallel (
        [
         function(callback){
           model.getDescriptionCircuit(data, (function (err, result){ callback(null,result)}));
         },
         function(callback){
           model.getListeVille( (function (err, result){callback(null,result)}));
         },
       ],


       function(err,result){

         if (err) {
             // gestion de l'erreur
             console.log(err);
             return;
         }

      response.circuit = result[0][0];
      response.listeCircuit = result[1];



    response.render('descriptionCircuit', response);
  }
  );
}
else{
  response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

  response.render('home', response);
}
  };


  module.exports.supprimerCircuit = function(request, response){
    var connect = request.cookies.connect;

    if(connect=="true"){
    let data = request.params.num;
    response.title = 'Description des circuits';

        async.parallel (
          [
           function(callback){
             model.supprimerCircuit(data, (function (err, result){ callback(null,result)}));
           },
           function(callback){
             model.supprimerGrandPrixCircuit(data, (function (err, result){callback(null,result)}));
           },
         ],


         function(err,result){

           if (err) {
               // gestion de l'erreur
               console.log(err);
               return;
           }

        response.circuit = result[0][0];
        response.listeCircuit = result[1];



      response.render('validationSuppressionCircuit', response);
    }
    );
  }
  else{
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

    response.render('home', response);
  }
    };
