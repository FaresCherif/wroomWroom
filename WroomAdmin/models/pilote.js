/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

/*
* Récupérer l'intégralité les écuries avec l'adresse de la photo du pays de l'écurie
* @return Un tableau qui contient le N°, le nom de l'écurie et le nom de la photo du drapeau du pays
*/
module.exports.getListePilote = function (callback) {
   // connection à la base

	db.getConnection(function(err, connexion){

        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT * FROM pilote order by PILNOM";
						sql= sql
						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//dateJour,dateMois,dateAnnee,national,ecurie,points,poids,taille,description,
module.exports.ajouterPilote = function (nom,prenom,description,poids,taille,points,nationalite,ecurie,date,callback) {
   // connection à la base

	db.getConnection(function(err, connexion){

        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="INSERT INTO `pilote`(`PAYNUM`, `PILNOM`, `PILPRENOM`, `PILDATENAIS`, `PILPOINTS`, `PILPOIDS`, `PILTAILLE`, `PILTEXTE`, `ECUNUM`) VALUES ("+nationalite+",'"+nom+"','"+prenom+"','"+date[0]+"-"+date[1]+"-"+date[2]+"',"+points+","+poids+"," +taille+",'"+description+"',"+ecurie+")";
						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.modifierPilote = function (num,nom,prenom,description,poids,taille,points,nationalite,ecurie,date,callback) {
   // connection à la base

	db.getConnection(function(err, connexion){

        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ='UPDATE `pilote` SET `PAYNUM`="'+nationalite+'",`PILNOM`="'+nom+'", `PILPRENOM`="'+prenom+'", `PILDATENAIS`="'+date[0]+'-'+date[1]+'-'+date[2]+'", `PILPOINTS`="'+points+'", `PILPOIDS`="'+poids+'", `PILTAILLE`="'+taille+'", `PILTEXTE`="'+description+'", `ECUNUM`="'+ecurie+'" where `PILNUM`='+num+'' ;
						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getListeNationalite = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT * FROM PAYS order by PAYNAT";
						sql= sql
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getListeEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT * FROM ECURIE order by ECUNOM";
						sql= sql
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};




module.exports.getPilotesLettre = function (lettre,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){

        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT * FROM pilote order by PILNOM";
						sql= sql
						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};



module.exports.getPilotesDescription = function (num,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){

        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ='SELECT * FROM pilote p join photo ph on p.PILNUM=ph.PILNUM join pays pa on pa.payNum=p.payNum left outer join ecurie e on p.ecunum=e.ecunum where p.PILNUM="' +num +'" and PHONUM=1 order by PILNOM';
						sql= sql
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getPiloteSponsor = function (num,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){

        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ='SELECT sp.SPONUM,SPONOM,SPOSECTACTIVITE FROM pilote p join sponsorise s on s.PILNUM=p.PILNUM JOIN sponsor sp on s.SPONUM=sp.SPONUM where p.PILNUM="' +num +'" order by PILNOM';
						sql= sql
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getPilotePhoto = function (num,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){

        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ='SELECT PHOADRESSE from pilote p join photo ph on p.PILNUM=ph.PILNUM where p.PILNUM="' + num+ '" AND PHONUM!=1';
						sql= sql
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


module.exports.supprimerPilote = function (num,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){

        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="DELETE FROM `pilote` WHERE `pilote`.`PILNUM` = "+num+" ";
						sql= sql
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.supprimerCoursePilote = function (num,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){

        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="DELETE FROM `course` WHERE `course`.`PILNUM` = "+num+" ";
						sql= sql
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.supprimerPhotoPilote = function (num,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){

        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="DELETE FROM `photo` WHERE `photo`.`PILNUM` = "+num+" ";
						sql= sql
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.supprimerSponsorisePilote = function (num,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){

        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="DELETE FROM `sponsorise` WHERE `sponsorise`.`PILNUM` = "+num+" ";
						sql= sql
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.supprimerEssaisPilote = function (num,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){

        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="DELETE FROM `essais` WHERE `essais`.`PILNUM` = "+num+" ";
						sql= sql
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getMotDePasse = function (num,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){

        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT PASSWD FROM login where LOGIN='"+num+"' ";
						sql= sql
						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
