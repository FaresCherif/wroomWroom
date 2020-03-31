
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// pilotes
    app.get('/repertoirePilote', PiloteController.Repertoire);
    app.get('/nomPilote/:lettre', PiloteController.ListerPilote)
    app.get('/descriptionPilote/:num', PiloteController.DescriptionPilote)


 // circuits
   app.get('/circuits', CircuitController.ListerCircuit);
   app.get('/circuits/:num', CircuitController.DescriptionCircuit);


// Ecuries
   app.get('/ecuries', EcurieController.ListerEcurie);
   app.get('/detailEcurie/:num', EcurieController.DescriptionEcurie);


 //Résultats
   app.get('/resultats', ResultatController.ListerResultat);
   app.get('/GrandPrixDescription/:num',ResultatController.DescriptionResultat);


// tout le reste
app.get('*', HomeController.NotFound);
app.post('*', HomeController.NotFound);

};
