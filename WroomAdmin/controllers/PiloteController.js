let model = require('../models/pilote.js');
let async=require('async');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Repertoire = 	function(request, response){
  var connect = request.cookies.connect;

  if(connect=="true"){

   response.title = 'Répertoire des pilotes';
     model.getListePilote( function (err, result) {

           if (err) {
               // gestion de l'erreur
               console.log(err);
               return;
           }

           response.listePilote = result;


      response.render('repertoirePilotes', response);
      });
    }
    else{
      response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

      response.render('home', response);
    }
  }



  module.exports.AjouterPilote = 	function(request, response){
    var connect = request.cookies.connect;

    if(connect=="true"){

    response.title = 'nomPilotes';

    async.parallel (
      [
       function(callback){
         model.getListeNationalite(function (err,result){ callback(null,result)});
       },
       function(callback){
         model.getListeEcurie((function (err, result){callback(null,result)}));
       },
     ],

     function(err,result){

       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
      response.listeNationalite = result[0];
      response.listeEcurie = result[1];
      console.log(response.listeEcurie);

      response.render('ajouterPilote', response);


      }
      );
    }
    else{
      response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

      response.render('home', response);
    }
    };

    module.exports.ModifierPilote = 	function(request, response){
      var connect = request.cookies.connect;

      if(connect=="true"){

      response.title = 'nomPilotes';
      let data = request.params.num;

      async.parallel (
        [
         function(callback){
           model.getListeNationalite(function (err,result){ callback(null,result)});
         },
         function(callback){
           model.getListeEcurie((function (err, result){callback(null,result)}));
         },
         function(callback){
           console.log(data);
           model.getPilotesDescription(data,(function (err, result){callback(null,result)}));
         },
       ],

       function(err,result){

         if (err) {
             // gestion de l'erreur
             console.log(err);
             return;
         }
        response.listeNationalite = result[0];
        response.listeEcurie = result[1];
        response.pilote=result[2][0];

        console.log(response.pilote);
        var str=response.pilote.PILDATENAIS.toString();

        var array = str.split(" ");
        console.log(array);

        response.dateJour=array[2];
        response.dateMois=array[1];
        response.dateAnnee=array[3];

        console.log(response.dateJour);

        if(response.dateMois=='Dec'){
          response.dateMois=12;
        }
        else if (response.dateMois=='Nov') {
          response.dateMois=11;
        }
        else if (response.dateMois=='Oct') {
          response.dateMois=10;
        }
        else if (response.dateMois=='Sep') {
          response.dateMois=9;
        }
        else if (response.dateMois=='Aug') {
          response.dateMois=8;
        }
        else if (response.dateMois=='Jul') {
          response.dateMois=7;
        }
        else if (response.dateMois=='Jun') {
          response.dateMois=6;
        }
        else if (response.dateMois=='May') {
          response.dateMois=5;
        }
        else if (response.dateMois=='Apr') {
          response.dateMois=4;
        }
        else if (response.dateMois=='Mar') {
          response.dateMois=3;
        }
        else if (response.dateMois=='Feb') {
          response.dateMois=2;
        }
        else if (response.dateMois=='Jan') {
          response.dateMois=1;
        }
        console.log(response.dateMois);
        console.log(response.dateAnnee);


        //console.log(response.listeEcurie);

        response.render('modifierPilote', response);

        }
        );
      }
        else{
          response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

          response.render('home', response);
        }
      };


    module.exports.FinirAjouterPilote = 	function(request, response){
      var connect = request.cookies.connect;

      if(connect=="true"){


          async.parallel (
            [
             function(callback){
               model.ajouterPilote(request.body.nom,request.body.prenom,request.body.description,request.body.poids,request.body.taille,request.body.points,request.body.nationalite,request.body.ecurie,request.body.date,function (err,result){ callback(null,result)});
             },
             function(callback){
               model.mettreAJourPoints(request.body.ecurie,function (err, result){callback(null,result)});
             },
           ],

           function(err,result){

             if (err) {
                 // gestion de l'erreur
                 console.log(err);
                 return;
             }


             response.render('validationAjoutPilote', response);


            }
            );




        }
          else{
            response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

            response.render('home', response);
          }
      }


      module.exports.FinirModifierPilote = 	function(request, response){
        var connect = request.cookies.connect;

        if(connect=="true"){

         response.title = 'Répertoire des pilotes';


         async.parallel (
           [
            function(callback){
              model.modifierPilote(request.body.num,request.body.nom,request.body.prenom,request.body.description,request.body.poids,request.body.taille,request.body.points,request.body.nationalite,request.body.ecurie,request.body.date,function (err,result){ callback(null,result)});
            },
            function(callback){
              model.mettreAJourPoints(request.body.ecurie,function (err, result){callback(null,result)});
            },
          ],

          function(err,result){

            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }


            response.render('validationAjoutPilote', response);


           }
           );









          }
          else{
            response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

            response.render('home', response);
          }
        }


    module.exports.DescriptionPilote = 	function(request, response){
      var connect = request.cookies.connect;

      if(connect=="true"){

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


        response.render('descriptionPilote', response);


        }
        );
      }
      else{
        response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

        response.render('home', response);
      }
      };


      module.exports.SupprimerPilote = 	function(request, response){
        var connect = request.cookies.connect;

        if(connect=="true"){

        response.title = 'nomPilotes';
        let data = request.params.num;


        async.parallel (
          [
           function(callback){
             model.supprimerPilote(data,function (err,result){ callback(null,result)});
           },
           function(callback){
             model.supprimerCoursePilote(data,function (err, result){callback(null,result)});
           },
           function(callback){
             model.supprimerEssaisPilote(data,function (err, result){callback(null,result)});
           },
           function(callback){
             model.supprimerPhotoPilote(data,function (err, result){callback(null,result)});
           },
           function(callback){
             model.supprimerSponsorisePilote(data,function (err, result){callback(null,result)});
           },
         ],

         function(err,result){

           if (err) {
               // gestion de l'erreur
               console.log(err);
               return;
           }
           console.log(request.cookies.connect);

          response.render('validationSuppressionPilote', response);


          }
          );
        }
        else{
          response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

          response.render('home', response);
        }
        };
