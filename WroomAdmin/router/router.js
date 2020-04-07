
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');
let SponsorController = require('./../controllers/SponsorController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);
    app.post('/connexion', HomeController.Connexion);

// pilotes
    app.get('/pilotes', PiloteController.Repertoire);
    app.get('/pilotes/Ajouter', PiloteController.AjouterPilote);
    app.post('/pilotes/ajouterPilote', PiloteController.FinirAjouterPilote);
    app.get('/descriptionPilote/:num', PiloteController.DescriptionPilote);
    app.get('/pilotes/supprimer/:num', PiloteController.SupprimerPilote);
    app.get('/pilotes/modifier/:num', PiloteController.ModifierPilote);
    app.post('/pilotes/modifier/modifierPilote', PiloteController.FinirModifierPilote);




 // circuits
   app.get('/circuits', CircuitController.ListerCircuit);
   app.get('/circuits/:num', CircuitController.DescriptionCircuit);
   app.get('/circuit/Ajouter', CircuitController.AjouterCircuit);
   app.post('/circuit/ajouterCircuit',CircuitController.FinirAjouterCircuit);
   app.get('/circuit/supprimer/:num', CircuitController.supprimerCircuit);
   app.get('/circuit/modifier/:num', CircuitController.modifierCircuit);
   app.post('/circuit/modifier/modifierCircuit', CircuitController.FinirModifierCircuit);





// Ecuries
   app.get('/ecuries', EcurieController.ListerEcurie);
   app.get('/detailEcurie/:num', EcurieController.DescriptionEcurie);
   app.get('/ecurie/ajouter',EcurieController.AjouterEcurie);
   app.post('/ecurie/ajouterEcurie',EcurieController.FinirAjouterEcurie);
   app.get('/ecurie/supprimer/:num',EcurieController.supprimerEcurie);
   app.get('/ecurie/modifier/:num', EcurieController.modifierEcurie);
   app.post('/ecurie/modifier/modifierEcurie', EcurieController.FinirModifierEcurie);





 //Résultats
   app.get('/resultats', ResultatController.ListerResultat);
   app.get('/modifierResultat/:place/:gpnum/:ancienPilNum', ResultatController.ModifierResultat);
   app.post('/modifierResultat/:place/:gpnum/terminerModifierResultat', ResultatController.terminerModifierResultat);


   app.get('/GrandPrixDescription/:num',ResultatController.DescriptionResultat);
   app.post('/saisirResultat',ResultatController.DescriptionResultat);


 //Sponsors
    app.get('/sponsors',SponsorController.ListerSponsor);
    app.get('/sponsor/ajouter',SponsorController.AjouterSponsor);
    app.post('/sponsor/FinirAjouterSponsor',SponsorController.FinirAjouterSponsor);
    app.get('/sponsor/supprimer/:num',SponsorController.SupprimerSponsor);
    app.get('/sponsor/modifier/:num',SponsorController.ModifierSponsor);
    app.post('/sponsor/modifier/FinirModifierSponsor',SponsorController.FinirModifierSponsor);





// tout le reste
app.get('*', HomeController.NotFound);
app.post('*', HomeController.NotFound);

};
