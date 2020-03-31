let model = require('../models/ecurie.js');
let async=require('async');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

   // //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function(request, response){
   response.title = 'Liste des écuries';
    model.getListeEcurie( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie = result;
        console.log(result);
        //console.log(result);
response.render('listerEcurie', response);
});
}

module.exports.AjouterEcurie = function(request, response){
  response.title = 'Liste des circuits';
    model.getListePays( function (err, result) {

      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listePays = result;


    response.render('ajoutEcurie', response);
    });
}

module.exports.FinirModifierEcurie = function(request, response){
  response.title = 'Liste des circuits';
app.use(fileUpload());
    model.modifierEcurie(request.body.num,request.body.nom,request.body.directeur,request.body.adsiege,request.body.points,request.body.nationalite, function (err, result) {

      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listePays = result;
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      console.log(request.files);
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      
    response.render('FinirModifierEcurie', response);
    });
}

module.exports.modifierEcurie = function(request, response){
  let data = request.params.num;
  response.title = 'Description des circuits';

      async.parallel (
        [
         function(callback){
           model.getDescriptionEcurie(data, (function (err, result){ callback(null,result)}));
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

      response.ecurie = result[0][0];
      response.listePays = result[1];


      console.log(response.ecurie);
    response.render('modifierEcurie', response);
  }
  );
  };


module.exports.FinirAjouterEcurie = function(request, response){
  response.title = 'Liste des circuits';
    model.ajoutEcurie(request.body.nom,request.body.directeur,request.body.adsiege,request.body.points,request.body.nationalite, function (err, result) {

      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listePays = result;


    response.render('validationAjoutEcurie', response);
    });
}


module.exports.DescriptionEcurie = function(request, response){
  let data = request.params.num;

   response.title = 'Liste des écuries';

   async.parallel (
     [
      function(callback){
          model.getListeEcurie( function (err, result) { callback(null,result)});
      },
      function(callback){
        model.getDescriptionEcurie(data, (function (err, result){callback(null,result)}));
      },
      function(callback){
        model.getPilote(data, (function (err, result){callback(null,result)}));
      },
      function(callback){
        model.getFournisseurPneumatic(data,(function(err,result){callback(null,result)}));
      },
      function(callback){
        model.getVoiture(data,(function(err,result){callback(null,result)}));
      },
    ],

    function(err,result){

      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }

        response.listeEcurie = result[0];
        response.ecurie = result[1][0];
        response.listePilote = result[2];
        response.fournisseurPneu = result[3][0];
        response.voiture=result[4];
        console.log(response.voiture);
response.render('descriptionEcurie', response);
});
}

module.exports.supprimerEcurie = function(request, response){
  let data = request.params.num;
  response.title = 'Description des circuits';

      async.parallel (
        [
         function(callback){
           model.supprimerEcurie(data, (function (err, result){ callback(null,result)}));
         },
         function(callback){
           model.supprimerVoitureEcurie(data, (function (err, result){callback(null,result)}));
         },
         function(callback){
           model.supprimerPiloteEcurie(data, (function (err, result){callback(null,result)}));
         },
         function(callback){
           model.supprimerFinanceEcurie(data, (function (err, result){callback(null,result)}));
         },
       ],


       function(err,result){

         if (err) {
             // gestion de l'erreur
             console.log(err);
             return;
         }




    response.render('validationSuppressionCircuit', response);
  }
  );
  };
