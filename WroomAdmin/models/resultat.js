let db = require('../configDb');

module.exports.getListeResultat = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT * FROM " +
                            "grandprix ORDER BY GPNOM";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getListePilote = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT * FROM " +
                            "PILOTE ORDER BY PILNOM";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getListeResultatGrandPris = function (num,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT * FROM " +
                            "grandprix ORDER BY GPNOM where GPNUM="+num+"";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.DescriptionResultat = function (num,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql = "select gpnum,row_number,PILNUM, PTPLACE,PILNOM, PILPRENOM, TEMPSCOURSE, PTNBPOINTSPLACE from " +
																		"(SELECT c.gpnum,@row_number:=@row_number+1 AS row_number ,c.pilnum,pilnom, pilprenom, tempscourse from course c join pilote p on c.pilnum = p.pilnum " +
																		"JOIN (SELECT @row_number := 0 FROM DUAL) as sub " +
																		"where c.gpnum =" + num +" order by tempscourse asc limit 10) t join points p on p.PTPLACE=t.row_number ";
						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.DescriptionResultatModifier = function (numpl,num,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql = "select gpnum,row_number,PILNUM, PTPLACE,PILNOM, PILPRENOM, TEMPSCOURSE, PTNBPOINTSPLACE from " +
																		"(SELECT c.gpnum,@row_number:=@row_number+1 AS row_number ,c.pilnum,pilnom, pilprenom, tempscourse from course c join pilote p on c.pilnum = p.pilnum " +
																		"JOIN (SELECT @row_number := 0 FROM DUAL) as sub " +
																		"where c.gpnum =" + num +" order by tempscourse asc limit 10) t join points p on p.PTPLACE=t.row_number AND PTPLACE!="+numpl+" ";
						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


module.exports.InfoResultat = function (num,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT * FROM " +
                            "grandprix where GPNUM="+num ;
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


module.exports.modifierResultat = function (gpnum,ancienPilNum,nouveauPilNum,tempsSec,tempsMin,tempsHeu,callback) {
   // connection à la base

	 console.log("/////////////////////////");

	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="UPDATE `course` SET `PILNUM`="+nouveauPilNum+",`TEMPSCOURSE`='"+tempsHeu+":"+tempsMin+":"+tempsSec+"' WHERE GPNUM="+gpnum+" AND PILNUM="+ancienPilNum+" ";

						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
