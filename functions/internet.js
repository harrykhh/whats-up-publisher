var request = require("request");

module.exports = function (Internetinforation, done) {
  try
    {
      var start = Date.now();
      request({
        url: Internetinforation.url,
        method: "GET",
        timeout: 10000,
        json: true,
        followRedirect: true,
        maxRedirects: 10,
        pool: false
      }, function(error, response, body) {
        var now = new Date();
        var internet_rt = now - start;
        var obj = { id: Internetinforation.id, ResponseTime: internet_rt };
        done(null, obj);
      });
    }
  catch (err)
  {
    console.error('Internet ajax Caught error!', err);
    console.error(require('../functions/get_time.js')());
    done(null, null);
  }
}
