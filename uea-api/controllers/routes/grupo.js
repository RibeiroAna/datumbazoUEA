var util = require('util');
var Grupo = require('../models/grupo');
var query = require('../../modules/query');

/*
  GET /grupoj
*/
var _getGrupoj = function(req, res){
  Grupo.find().then(function(sucess){
        var grupoj = sucess;
        grupoj = grupoj.filter(query.search(req.query));
        res.status(200).send(grupoj);
  });
}

/*
  GET /grupoj/:id
*/
var _getGrupo = function(req, res){
  Grupo.find(req.params.id).then(function(sucess){
      var grupo = sucess;
      grupo = grupo.filter(query.search(req.query));
      res.status(200).send(grupo);
  });
}

/*
   GET /grupoj/laboroj
*/

var _getLaborgrupoj = function(req, res){
  Grupo.findKategorio('1').then(function(sucess){
        var grupoj = sucess;
        grupoj = grupoj.filter(query.search(req.query));
        res.status(200).send(grupoj);
  });
}

/*
   GET /grupo/laboroj/estraranoj
*/
var _getLaboranoj = function(req, res){
  Grupo.findLaboranoj(req.params.id).then(function(sucess){
        var anoj = sucess;
        anoj = anoj.filter(query.search(req.query));
        res.status(200).send(anoj);
  });
}


module.exports = {
  getGrupoj: _getGrupoj,
  getGrupo: _getGrupo,
  getLaborgrupoj: _getLaborgrupoj,
  getLaboranoj: _getLaboranoj
}
