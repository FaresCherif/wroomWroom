let model = require('../models/pilote.js');

  // ////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";
    response.cookie("connect" , false);

    response.render('home', response);
};
module.exports.NotFound = function(request, response){
  var connect = request.cookies.connect;

  if(connect=="true"){
    response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
    response.render('notFound', response);
  }
  else{
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";

    response.render('home', response);
  }
};

module.exports.Connexion = function(request, response){
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";
    response.cookie("connect" , true);

    console.log("//////////////////");
    var x = request.cookies.connect;
    console.log(x);
    console.log("//////////////////");

    data=request.body.login;
    model.getMotDePasse(data,( function (err, result) {
      let vraiMdp;

      if(result[0]==null){
         mdpEntreDecrypt="Mauvais mot de passe";
      }
      else{
        let Cryptr=require('cryptr');


        let cryptr=new Cryptr('MaSuperCléDeChiffrementDeouF');

        vraiMdp=cryptr.decrypt(result[0].PASSWD);
        console.log(vraiMdp);


        mdpEntreDecrypt=request.body.mdp;
        console.log(mdpEntreDecrypt);

      }


      console.log(mdpEntreDecrypt);
      console.log(vraiMdp);
      console.log(mdpEntreDecrypt==vraiMdp);
        if(mdpEntreDecrypt==vraiMdp){
          response.render('connexion', response);
        }
        else{
          response.render('home', response);
        }
      }

))};
