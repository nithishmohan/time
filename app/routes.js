var time= require('./time.js')
module.exports = function(app) {
  // GET home 
  app.get('/api/parsetime',time.parseTime)

}