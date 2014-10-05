var CronJob = require('cron').CronJob;
var path = require("path");
var async = require("async");

var internet = require('./functions/internet_publish.js');

var db2 = require('./functions/db2_jdbc.js');
var td = require('./functions/td_jdbc.js');
var oracle = require('./functions/oracle_jdbc.js');

var config = require('./config/config.json');

var con = {
	libpath: [path.join(__dirname, 'jdbc/db2/db2jcc4.jar') ,
						path.join(__dirname, 'jdbc/teradata/tdgssconfig.jar'),
						path.join(__dirname, 'jdbc/teradata/terajdbc4.jar'),
						path.join(__dirname, 'jdbc/oracle/ojdbc6.jar')],
	drivername: 'com.teradata.jdbc.TeraDriver',
	url: ''
};

require('./functions/jdbc.js')(con, null);

var job = new CronJob({
	cronTime: "*/5 * * * * *",
	onTick: function() {
		internet(config.Internetinforation);

		async.parallel({
			DB2: function(done){
				db2(config.DB2inforation, done)
			},
			TD: function(done){
				td(config.TDinforation, done)
			},
			Oracle:  function(done){
				oracle(config.Oracleinforation, done)
			},
		}, function(err, results) {
			var db_status = {};
			db_status.DB2 = results.DB2;
			db_status.Oracle = results.Oracle;
			db_status.Teradata = results.TD;
			require('./functions/publish_update.js')('database status', db_status);
		});
	},
	start: true
});
job.start();
