
var fse = require('fs-extra');
var path = require('path');
var process = require('process');

module.exports = plugin;

function plugin(opts) {

  var defaults = {
    'filename':'./typesmith-db.json',
    'separator':'  '
  }

  return function(typesmith, done){

    var config = Object.assign({}, defaults, typesmith.config['typesmith-write-json'], opts);

    fse.ensureDirSync(path.dirname(config.filename));
    fse.writeFileSync(config.filename, JSON.stringify(Object.values(typesmith.db), null, config.separator), 'utf8');

    done();
  };

}