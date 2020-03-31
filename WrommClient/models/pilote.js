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
						let sql ="SELECT DISTINCT(LEFT(PILNOM, 1)) AS initial FROM pilote order by PILNOM";
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
						let sql ="SELECT * FROM pilote p join photo ph on p.PILNUM=ph.PILNUM where PILNOM like '" +lettre +"%' AND PHONUM=1 order by PILNOM";
						sql= sql
						//console.log (sql);
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
