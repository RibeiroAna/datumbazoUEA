/*Libraries*/
var util = require('util');

/*models*/
var Aneco = require('../models/aneco');

/*modules*/
var query = require('../modules/query');
var mail = require('../modules/mail');

/*Configuration*/
var config = require('../config');

/*
   GET /grupo/membrecoj/:id/kotizoj
*/
var _getKotizoj = function(req, res){
  Aneco.findGrupo(req.params.id).then(function(sucess){
        var kotizoj = sucess;
        kotizoj = kotizoj.filter(query.search(req.query));
        res.status(200).send(kotizoj);
  });
}

/*
   POST /grupo/membrecoj/:id/kotizoj
*/
var _postKotizo = function(req, res){
  Aneco.insertKotizo(req.body.idLando, req.body.prezo,
                     req.params.id, req.body.junaRabato)
             .then(function(sucess) {
                    if(sucess) {
                      res.status(201).send(sucess);
                    } else {
                      res.status(500).send({message: 'Internal Error'});
                    }
              });
}

/*
  UPDATE /grupo/:id/kotizoj
*/
var _updateKotizo = function(req, res){
  if (req.body.kampo == 'id') {
    res.status(403).send({message: "vi ne povas ŝanĝi la ID"})
  }
  Aneco.updateKotizo(req.body.id, req.body.kampo, req.body.valoro).then(
    function(sucess) {
      if (sucess) {
        res.status(200).send({message: "Ĝisdatigo sukcese farita"});
      } else {
        res.status(500).send({message: "Eraro en la servilo"});
      }
  });
}

/*
  UPDATE /grupo/anecoj/:id
*/
var _aprobiAnecon = function(req, res){
  Aneco.updateAneco(req.params.id, 'aprobita', true).then(
    function(sucess) {
      if (sucess) {
        if(req.body.retposxto){
          var html = util.format(
                 'Estimata, <br><br>\
                  Via peto por %s en UEA/TEJO estis aprobita. \
                  En kazo de duboj, kontaktu info@uea.org. \
                  <br><br>Kore,<br><br>\
                  La UEA-Teamo', req.body.anecnomo);
          var to = util.format('{"%s" : "UEA-membro"}', req.body.retposxto);
          var mailOptions = {
              to: JSON.parse(to),
              subject: 'Peto aprobita',
              html: html
            }
          mail.sendiRetmesagxo(mailOptions);
        }
        res.status(200).send({message: "Ĝisdatigo sukcese farita"});
      } else {
        res.status(500).send({message: "Eraro en la servilo"});
      }
  });
}

var _deleteAneco = function(req, res) {
  Aneco.deleteAneco(req.params.id).then(
    function(sucess) {
      if(sucess) {
        if(req.body.retposxto){
          var html = util.format(
                 'Estimata, <br><br>\
                  Via peto por %s en UEA/TEJO estis malaprobita. \
                  En kazo de duboj, kontaktu info@uea.org. \
                  <br><br>Kore,<br><br>\
                  La UEA-Teamo', req.body.anecnomo);
          var to = util.format('{"%s" : "UEA-membro"}', req.body.retposxto);
          var mailOptions = {
              to: JSON.parse(to),
              subject: 'Peto malaprobita',
              html: html
            }
          mail.sendiRetmesagxo(mailOptions);
        }
        res.status(204).send({message: 'Ok'});
      } else {
        res.status(500).send({message: "Eraro en la servilo"});
      }
    }
  );
}

var _updateAneco = function(req, res) {
  Aneco.updateAneco(req.params.id, req.body.kampo, req.body.valoro).then(
    function(sucess) {
      if (sucess) {
        res.status(200).send({message: "Ĝisdatigo sukcese farita"});
      } else {
        res.status(500).send({message: "Eraro en la servilo"});
      }
  });
}

module.exports = {
  getKotizoj: _getKotizoj,
  aprobiAnecon: _aprobiAnecon,
  postKotizo: _postKotizo,
  deleteAneco: _deleteAneco,
  updateAneco:  _updateAneco,
  updateKotizo:  _updateKotizo
}
