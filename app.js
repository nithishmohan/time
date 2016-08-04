
var PORT=process.argv[2];
var express = require('express')

var logger = require('morgan')
, errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('port', PORT || 3000);

app.use(logger('dev'));
// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

// routing
require('./app/routes.js')(app);

var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

