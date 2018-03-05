
var fse = require('fs-extra');
var path = require('path');
var process = require('process');
var merge_options = require('merge-options');

module.exports = plugin;

function plugin(opts) {

  var plugin_defaults = {
    'filename':'./typesmith-db.json',
    'separator':'  '
  }

  return function(typesmith, done){

    var config = merge_options.call({concatArrays: true}, {}, plugin_defaults, typesmith.config['typesmith-write-json'], opts);

    fse.ensureDirSync(path.dirname(config.filename));
    fse.writeFileSync(config.filename, JSON.stringify(typesmith.db.all(), null, config.separator), 'utf8');

    done();
  };

}