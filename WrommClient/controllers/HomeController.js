
  // ////////////////////////////////////////////// A C C U E I L
  let model = require('../models/resultat.js');


module.exports.Index = function(request, response){
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";



    	model.getListeDernierResultat( function (err, result) {

    				if (err) {
    						// gestion de l'erreur
    						console.log(err);
    						return;
    				}

    				response.listeResultat = result[0];
            console.log(response.listeResultat);

    				//console.log(result);
            response.render('home', response);

    	 });

    };


module.exports.NotFound = function(request, response){
    response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
    response.render('notFound', response);
};
