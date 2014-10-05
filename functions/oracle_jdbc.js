var async = require("async");
var mongoose = require('mongoose');
var log = require('../models/rt_log.js').log;
module.exports = function (Oracleinforation, finished) {
  async.mapLimit(Oracleinforation, 15, function(item, done) {
    var config = {
      drivername: 'oracle.jdbc.OracleDriver',
      query: 'SELECT 1 From dual',
      start: new Date(),
      url: item.url,
      id: item.id
    };
    require('../functions/jdbc.js')(config, done);
  },
  function(err, results){
    var oracle_rt = {};
    oracle_rt.nodes = [];

    var now = new Date();
    var temp = new Date(now);
    temp.setMinutes(0);
    temp.setSeconds(0);
    temp.setMilliseconds(0);
    var minute = now.getMinutes();
    var dynSet = {$set: {}};

    Oracleinforation.forEach(function(item) {
      results.forEach(function(re) {
        if (item.id == re.id){
          oracle_rt.nodes.push({"ResponseTime" : re.ResponseTime, "Name" : item.name });

          dynSet.$set["ResponseTime." + minute + "." + now.getSeconds()] = re.ResponseTime;
          log.findOneAndUpdate({
                                TimeStamp: temp,
                                id: item.id,
                                Name: item.name,
                                Tag: ["Oracle"]
                              },
                              dynSet,
          { safe: true, new: true, upsert: true }, function(err, obj) {
            if (err) console.error("Error Occured!", err);
          });
        }
      });
    });
    require('../functions/publish_update.js')('Oracle', oracle_rt);
    var status = 0;
    if (results.length > 1)
      status = 1;
    finished(null, status);
  });
}
