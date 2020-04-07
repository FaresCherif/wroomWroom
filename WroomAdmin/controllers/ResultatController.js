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


module.exports.terminerModifierResultat = function(request, response){
	var connect = request.cookies.connect;

  if(connect=="true"){
		let ancienPilNum=request.body.ancienPilNum;
		let nouveauPilNum=request.body.nouveauPilNum;
		let tempsSec=request.body.temps[2];
		let tempsMin=request.body.temps[1];
		let tempsHeu=request.body.temps[0];
		let gpnum=request.body.gpnum;

	response.title = 'Liste des résulats des grands prix';
	console.log(request.body);
	console.log(ancienPilNum);
	console.log(nouveauPilNum);
	console.log(tempsSec);
	console.log(tempsMin);
	console.log(tempsHeu);
	console.log(gpnum);

	model.modifierResultat(gpnum,ancienPilNum,nouveauPilNum,tempsSec,tempsMin,tempsHeu, function (err, result) {

				if (err) {
						// gestion de l'erreur
						console.log(err);
						return;
				}
				response.modifierResultat = result;

				//console.log(result);
				response.render('terminerModifierResultat', response);

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
	console.log(request.body);
	console.log(data);

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
				response.gpnum=data;
				response.descriptionResultat = result[1];
				response.InfoResultat = result[2][0];
				console.log("//////////////////////");
			  console.log(response.descriptionResultat);
				console.log("//////////////////////");

				response.render('descriptionResultat', response);

	 });
 }
 else{
 	response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

 	response.render('home', response);
 }
};


module.exports.ModifierResultat = function(request, response){
	var connect = request.cookies.connect;

  if(connect=="true"){
	let data = request.params.gpnum;
	let numpl = request.params.place;
	let ancienPilNum=request.params.ancienPilNum;
	console.log(request.body);
	console.log(request.params.ancienPilNum);

	response.title = 'Liste des résulats des grands prix';

	async.parallel (
		[
		 function(callback){
			 	model.getListePilote( function (err, result) { callback(null,result)});
		 },
		 function(callback){
			 model.DescriptionResultatModifier(numpl,data, (function (err, result){callback(null,result)}));
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
				response.gpnum=data;
				response.place=numpl;
				response.ancienPilNum=ancienPilNum;
				response.descriptionResultat = result[1];
				response.InfoResultat = result[2][0];
				console.log("//////////////////////");
			  console.log(response.descriptionResultat);
				console.log("//////////////////////");

				response.render('modifierResultat', response);

	 });
 }
 else{
 	response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

 	response.render('home', response);
 }
};
