let model = require('../models/resultat.js');
let async=require('async');

  // //////////////////////////L I S T E R    R E S U L T A T S
module.exports.ListerResultat = function(request, response){
	var connect = request.cookies.connect;

  if(connect=="true"){

	response.title = 'Liste des résulats des grands prix';

	model.getListeResultat( function (err, result) {

				if (err) {
						// gestion de l'erreur
						console.log(err);
						return;
				}

				response.listeResultat = result;

				//console.log(result);
				response.render('listerResultat', response);

	 });
 }
 else{
	 response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

	 response.render('home', response);
 }

};

module.exports.SaisirResultat = function(request, response){
	var connect = request.cookies.connect;

  if(connect=="true"){

	response.title = 'Liste des résulats des grands prix';

	model.getListeResultatGrandPris( function (err, result) {

				if (err) {
						// gestion de l'erreur
						console.log(err);
						return;
				}

				response.listeResultat = result;

				//console.log(result);
				response.render('listerResultat', response);

	 });
 }
 else{
	 response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

	 response.render('home', response);
 }

};

module.exports.DescriptionResultat = function(request, response){
	var connect = request.cookies.connect;

  if(connect=="true"){
	let data = request.body.gpnum;

	response.title = 'Liste des résulats des grands prix';

	async.parallel (
		[
		 function(callback){
			 	model.getListeResultat( function (err, result) { callback(null,result)});
		 },
		 function(callback){
			 model.DescriptionResultat(data, (function (err, result){callback(null,result)}));
		 },
		 function(callback){
			 model.InfoResultat(data, (function (err, result){callback(null,result)}));
		 },

	 ],

	 function(err,result){

		 if (err) {
				 // gestion de l'erreur
				 console.log(err);
				 return;
		 }



				response.listeResultat = result[0];
				response.descriptionResultat = result[1];
				response.InfoResultat = result[2][0];

			  console.log(response.descriptionResultat);
				response.render('descriptionResultat', response);

	 });
 }
 else{
 	response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

 	response.render('home', response);
 }
};
