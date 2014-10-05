var async = require("async");
var mongoose = require('mongoose');
var log = require('../models/rt_log.js').log;

module.exports = function (Internetinforation) {

  async.mapLimit(Internetinforation, 15, function(item, done) {
    require('../functions/internet.js')(item, done);
  },
  function(err, results){
    var internet_rt = {};
    internet_rt.nodes = [];

    var now = new Date();
    var temp = new Date(now);
    temp.setMinutes(0);
    temp.setSeconds(0);
    temp.setMilliseconds(0);
    var minute = now.getMinutes();
    var dynSet = {$set: {}};

    Internetinforation.forEach(function(item) {
      results.forEach(function(re) {
        if (item.id == re.id){
          internet_rt.nodes.push({"ResponseTime" : re.ResponseTime, "Name" : item.name });

          dynSet.$set["ResponseTime." + minute + "." + now.getSeconds()] = re.ResponseTime;
          log.findOneAndUpdate({
                                TimeStamp: temp,
                                id: item.id,
                                Name: item.name,
                                Tag: ["Internet"]
                              },
                              dynSet,
          { safe: true, new: true, upsert: true }, function(err, obj) {
            if (err) console.error("Error Occured!", err);
          });
        }
      });
    });
    require('../functions/publish_update.js')('Internet', internet_rt);
  });
}
