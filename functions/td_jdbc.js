var async = require("async");
var mongoose = require('mongoose');
var log = require('../models/rt_log.js').log;
module.exports = function (TDinforation, finished) {
  async.mapLimit(TDinforation, 15, function(item, done) {
    var config = {
      drivername: 'com.teradata.jdbc.TeraDriver',
      query: 'select * from dbc.dbcinfo',
      start: new Date(),
      url: item.url,
      id: item.id
    };
    require('../functions/jdbc.js')(config, done);
  },
  function(err, results){
    var td_rt = {};
    td_rt.nodes = [];

    var now = new Date();
    var temp = new Date(now);
    temp.setMinutes(0);
    temp.setSeconds(0);
    temp.setMilliseconds(0);
    var minute = now.getMinutes();
    var dynSet = {$set: {}};

    TDinforation.forEach(function(item) {
      results.forEach(function(re) {
        if (item.id == re.id){
          td_rt.nodes.push({"ResponseTime" : re.ResponseTime, "Name" : item.name });

          dynSet.$set["ResponseTime." + minute + "." + now.getSeconds()] = re.ResponseTime;
          log.findOneAndUpdate({
                                TimeStamp: temp,
                                id: item.id,
                                Name: item.name,
                                Tag: ["Teradata"]
                              },
                              dynSet,
          { safe: true, new: true, upsert: true }, function(err, obj) {
            if (err) console.error("Error Occured!", err);
          });
        }
      });
    });
    require('../functions/publish_update.js')('Teradata', td_rt);
    var status = 0;
    if (results.length > 1)
      status = 1;
    finished(null, status);
  });
}
