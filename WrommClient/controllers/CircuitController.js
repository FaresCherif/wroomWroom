// ////////////////////// L I S T E R     C I R C U I T S

let model = require('../models/circuit.js');
let async=require('async');


module.exports.ListerCircuit = function(request, response){

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

module.exports.DescriptionCircuit = function(request, response){
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
  };
