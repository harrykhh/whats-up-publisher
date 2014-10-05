var jd = require('jdbc');
module.exports = function (config, done) {
    var jdbc = new (jd);
    jdbc.initialize(config, function(err, res) {
      if (err) {
        console.log(err);
      }
    });

    if (config.url =='')
      return;

    jdbc.open(function(err, conn) {
      if(err) {
        console.log("Cannot connect!");
        console.log(err.message);
      }else if (conn) {
        //console.log("Connection opened successfully! " + config.drivername);
        // SELECT statements are called with executeQuery
        jdbc.executeQuery(config.query, genericQueryHandler);

      }
    });

    var genericQueryHandler = function(err, results) {
      if (err) {
        console.log(err);
      } else if (results) {
        jdbc.close(function(err) {
          if(err) {
            console.log(err);
          } else {
            //console.log("Connection closed successfully! " + config.drivername);
            var ResponseTime = new Date() - config.start;
            var obj = {id: config.id, ResponseTime: ResponseTime};
            done(null, obj);
          }
        });
      }
    };

}
