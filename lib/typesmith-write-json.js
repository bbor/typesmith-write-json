
var fs = require('fs');
var path = require('path');
var process = require('process');

module.exports = plugin;

/*
  options:
  - filename: the name of the file to export to. Can be absolute or relative to the
              current working directory. Will be overwritten if it exists already.
  - separator: as the `spaces` argument of JSON.stringify.
*/

function plugin(opts) {

  return function(typesmith, done){

    opts = opts || typesmith.config['typesmith-write-json'] || {}

    function ensureDirectoryExists(filePath) {
      var dirname = path.dirname(filePath);
      if (fs.existsSync(dirname)) {
        return true;
      }
      ensureDirectoryExists(dirname);
      fs.mkdirSync(dirname);
    }

    var fn = opts.filename;
    if (fn)
    {
      if (!path.isAbsolute(fn))
      {
        fn = path.join(process.cwd(), fn);
      }
      ensureDirectoryExists(fn);
      var separator = opts.separator || '  ';
      fs.writeFileSync(opts.filename, JSON.stringify(typesmith.db, null, separator), 'utf8');
    }
    done();
  };

}