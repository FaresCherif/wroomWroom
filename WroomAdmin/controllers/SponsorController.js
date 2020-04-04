let model = require('../models/sponsor.js');
let async=require('async');

module.exports.ListerSponsor = function(request, response){
	var connect = request.cookies.connect;

  if(connect=="true"){
	response.title = 'Liste des résulats des grands prix';

	model.getListeSponsor( function (err, result) {

				if (err) {
						// gestion de l'erreur
						console.log(err);
						return;
				}

				response.ListerSponsor = result;

				//console.log(result);
				response.render('ListerSponsor', response);

	 });
 }
 else{
	 response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

	 response.render('home', response);
 }

};

module.exports.AjouterSponsor = function(request, response){
	var connect = request.cookies.connect;

	if(connect=="true"){

	response.title = 'Liste des résulats des grands prix';

	model.getListeEcurie( function (err, result) {

				if (err) {
						// gestion de l'erreur
						console.log(err);
						return;
				}

				response.ListerEcurie = result;
				console.log(result);
				response.render('AjouterSponsor', response);

	 });
 }
 else{
 	response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

 	response.render('home', response);
 }
};

module.exports.ModifierSponsor = function(request, response){
	var connect = request.cookies.connect;

	if(connect=="true"){
  let data = request.params.num;
  response.title = 'Description des circuits';

      async.parallel (
        [
         function(callback){
           model.getListeEcurie((function (err, result){ callback(null,result)}));
         },
         function(callback){
           model.getDescriptionSponsor(data, (function (err, result){callback(null,result)}));
         },
       ],


       function(err,result){

         if (err) {
             // gestion de l'erreur
             console.log(err);
             return;
         }

				 response.listeEcurie = result[0];
			 	response.sponsor = result[1][0];

				console.log(response.sponsor);
    response.render('modifierSponsor', response);
  }
  );
}
else{
	response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

	response.render('home', response);
}
  };

module.exports.FinirAjouterSponsor = function(request, response){
	var connect = request.cookies.connect;

	if(connect=="true"){

	response.title = 'Liste des résulats des grands prix';

   async.parallel (
     [
      function(callback){
        let data = model.AjouterSponsor(request.body.nom,request.body.seactivite, function (err, result) {
          callback(null,result)});
          console.log(data);
      },
      function(callback){
        if(request.body.ecurie!=null){
          model.AjouterSponsorise(request.body.ecurie,function (err, result) {callback(null,result)});
        }
      },

    ],

    function(err,result){

      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }



				response.ListerEcurie = result;
				console.log(result);
				response.render('validationAjoutSponsor', response);

    });
	}
	else{
		response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

		response.render('home', response);
	}
};


module.exports.FinirModifierSponsor = function(request, response){
	var connect = request.cookies.connect;

	if(connect=="true"){

	response.title = 'Liste des résulats des grands prix';

   async.parallel (
     [
      function(callback){
        let data = model.modifierSponsor(request.body.num,request.body.nom,request.body.seactivite, function (err, result) {
          callback(null,result)});

console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      },
      function(callback){
        if(request.body.ecurie!=null){
          model.modifierSponsorise(request.body.num,request.body.ecurie,function (err, result) {callback(null,result)});
        }
      },

    ],

    function(err,result){

      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }



				response.ListerEcurie = result;
				console.log(result);
				response.render('validationAjoutSponsor', response);

    });
	}
	else{
		response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

		response.render('home', response);
	}
};





module.exports.SupprimerSponsor = function(request, response){
	var connect = request.cookies.connect;

	if(connect=="true"){
  let data = request.params.num;
  response.title = 'Description des circuits';

      async.parallel (
        [
         function(callback){
           model.supprimerSponsor(data, (function (err, result){ callback(null,result)}));
         },
         function(callback){
           model.supprimerSponsoriseSponsor(data, (function (err, result){callback(null,result)}));
         },
         function(callback){
           model.supprimerFinanceSponsor(data, (function (err, result){callback(null,result)}));
         },
       ],


       function(err,result){

         if (err) {
             // gestion de l'erreur
             console.log(err);
             return;
         }




    response.render('validationSuppressionSponsor', response);
  }
  );
}
else{
	response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

	response.render('home', response);
}
  };
