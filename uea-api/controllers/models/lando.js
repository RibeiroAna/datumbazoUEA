var util = require('util');
var db = require('../../modules/db');

var _landoNull = function(){
  return {
    nomoLoka : null,
    nomoEo : null,
    finajxoEo: null,
    landKodo : null
  }
}

var _create = function(obj){
  var lando = _landoNull();
  keys = Object.keys(lando);
  for(i=0; i < keys.length; i++){
    lando[keys[i]] = obj[keys[i]];
  }
  return lando;
}

var _insert = function(lando){
  var query = util.format(
  'INSERT INTO lando (nomoLoka, radikoEO, finajxoEO, landKodo) VALUES ("%s", "%s", "%s", "%s");',
  lando.nomoLoka, lando.nomoEo, lando.finajxoEo, lando.landKodo);
  return db.mysqlExec(query);
}

var _delete = function(id){
  var query = util.format(
  'DELETE FROM `lando` \
  WHERE `id` = %s ;', id);
  return db.mysqlExec(query);
}

var _find = function(id){
  if(id)
    var query = util.format('SELECT * FROM `lando` WHERE `id` = %s;', id);
  else
    var query = util.format('SELECT * FROM `lando`;');
  return db.mysqlExec(query);
}

module.exports = {
  find:_find,
  create:_create,
  insert:_insert,
  delete:_delete
}
