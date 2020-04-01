let model = require('../models/pilote.js');
let async=require('async');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Repertoire = 	function(request, response){
   response.title = 'Répertoire des pilotes';
     model.getListePilote( function (err, result) {

           if (err) {
               // gestion de l'erreur
               console.log(err);
               return;
           }

           response.listePilote = result;

           //console.log(result);

      response.render('repertoirePilotes', response);
      });
  }



  module.exports.ListerPilote = 	function(request, response){
    let data = request.params.lettre;
    response.title = 'nomPilotes';

    async.parallel (
      [
       function(callback){
         model.getListePilote(function (err,result){ callback(null,result)});
       },
       function(callback){
         model.getPilotesLettre(data, (function (err, result){callback(null,result)}));
       },
     ],

     function(err,result){

       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
      response.listePilote = result[0];
      response.pilote = result[1];

      response.render('nomPilotes', response);


      }
      );
    };


    module.exports.DescriptionPilote = 	function(request, response){
      let data = request.params.num;
      response.title = 'descriptionPilote';

      async.parallel (
        [
         function(callback){
           model.getListePilote(function (err,result){ callback(null,result)});
         },
         function(callback){
           model.getPilotesDescription(data, (function (err, result){callback(null,result)}));
         },
         function(callback){
           model.getPiloteSponsor(data,(function(err,result){callback(null,result)}));
         },
         function(callback){
           model.getPilotePhoto(data,(function(err,result){callback(null,result)}));
         },
       ],
       function(err,result){

         if (err) {
             // gestion de l'erreur
             console.log(err);
             return;
         }

        response.listePilote = result[0];
        response.pilote = result[1][0];
        console.log(response.pilote);

        response.sponsor=result[2];
        //console.log(response.sponsor)
        response.photos=result[3];

        console.log(response.photos);
        response.render('descriptionPilote', response);


        }
        );
      };
