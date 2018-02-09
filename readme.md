# typesmith-write-json

This plugin for [typesmith.js](http://www.github.com/bbor/typesmith) writes all the elements in the typesmith database out to a JSON file on disk as an array. This is useful to check that the objects are getting read in the way you're expecting.

Also, you can read the file back in later with `typesmith-read-json` in a future run to put all the records back in the database exactly as it was when you ran this plugin to create the file.

Note though that the actual typesmith db is keyed by the `uid` value of the objects you'll see in the output array.

## Options

`filename`

>	The path and filename to export to. Can be absolute or relative to the current working directory. If this file exists already, it will be overwritten silently. The default value is `./typesmith-db.json`

`separator`

>	The spacing between records that is passed to `JSON.stringify()`. The default value is `  ` (two spaces).

## Usage

As any other `typesmith` plugin, require it in your module and pass it to `typesmith.use()`:

```js
var typesmith = require('typesmith');
var jsonWriter = require('typesmith-write-json');
... // require other plugins

var config = {
	... // config options and type info goes here
}

typesmith(config)
  .use(readJson())
  .use(readMarkdown())
  .use(autoparent())
  .use(subgroup())
  .use(writeJson())
  .use(writeHtml())
  .run( function(errmsg) { if (errmsg) { console.log("Error: " + errmsg); } console.log('finished!'); } );

```
