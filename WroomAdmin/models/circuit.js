let db = require('../configDb');

/*
* Récupérer l'intégralité les écuries avec l'adresse de la photo du pays de l'écurie
* @return Un tableau qui contient le N°, le nom de l'écurie et le nom de la photo du drapeau du pays
*/
module.exports.getListeVille = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT * FROM circuit order by CIRNOM"

						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getListePays = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT * FROM PAYS order by PAYNOM"

						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.ajouterCircuit = function (image,nom,nationalite,longueur,nbspectateur,description,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="INSERT INTO `circuit`(`PAYNUM`, `CIRNOM`, `CIRLONGUEUR`, `CIRNBSPECTATEURS`, `CIRADRESSEIMAGE`, `CIRTEXT`) VALUES ("+nationalite+",'"+nom+"',"+longueur+","+nbspectateur+",'"+image+"','"+description+"')"

						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.modifierCircuit = function (num,image,nom,nationalite,longueur,nbspectateur,description,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="UPDATE `circuit` SET `PAYNUM`='"+nationalite+"', `CIRNOM`='"+nom+"', `CIRLONGUEUR`='"+longueur+"', `CIRNBSPECTATEURS`='"+nbspectateur+"', `CIRADRESSEIMAGE`='"+image+"', `CIRTEXT`='"+description+"' where CIRNUM='"+num+"'"

						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getDescriptionCircuit = function (num,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT * FROM circuit c join pays p on c.PAYNUM=p.PAYNUM where CIRNUM="+num+" order by CIRNOM"

						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


module.exports.supprimerCircuit = function (num,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="DELETE FROM `circuit` WHERE `circuit`.`CIRNUM` = "+num+""

						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.supprimerGrandPrixCircuit = function (num,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="DELETE FROM `grandprix` WHERE `grandprix`.`CIRNUM` = "+num+""

						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
