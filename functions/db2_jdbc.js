var async = require("async");
var mongoose = require('mongoose');
var log = require('../models/rt_log.js').log;
module.exports = function (DB2inforation, finished) {
  async.mapLimit(DB2inforation, 15, function(item, done) {
    var config = {
      drivername: 'com.ibm.db2.jcc.DB2Driver',
      query: 'SELECT * FROM SYSIBM.SYSDUMMY1',
      start: new Date(),
      url: item.url,
      id: item.id
    };
    require('../functions/jdbc.js')(config, done);
  },
  function(err, results){
    var db2_rt = {};
    db2_rt.nodes = [];

    var now = new Date();
    var temp = new Date(now);
    temp.setMinutes(0);
    temp.setSeconds(0);
    temp.setMilliseconds(0);
    var minute = now.getMinutes();
    var dynSet = {$set: {}};

    DB2inforation.forEach(function(item) {
      results.forEach(function(re) {
        if (item.id == re.id){
          db2_rt.nodes.push({"ResponseTime" : re.ResponseTime, "Name" : item.name });

          dynSet.$set["ResponseTime." + minute + "." + now.getSeconds()] = re.ResponseTime;
          log.findOneAndUpdate({
                                TimeStamp: temp,
                                id: item.id,
                                Name: item.name,
                                Tag: ["DB2"]
                              },
                              dynSet,
          { safe: true, new: true, upsert: true }, function(err, obj) {
            if (err) console.error("Error Occured!", err);
          });
        }
      });
    });
    require('../functions/publish_update.js')('DB2', db2_rt);
    var status = 0;
    if (results.length > 1)
      status = 1;
    finished(null, status);
  });
}
