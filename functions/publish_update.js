const redis = require('redis');
var config = require('../config/config.json');
var REDIS_URL = config.redis_url;
var REDIS_PORT = config.redis_port;
// create a redis connection
try
{
  const publish = redis.createClient( REDIS_PORT, REDIS_URL );
}
catch (err)
{
  console.log( "ERROR => Cannot connect to Redis message broker: URL => " + REDIS_URL + "; Port => " + REDIS_PORT );
  console.log(err);
}
module.exports = function (channelName ,updates) {
  publish.publish(channelName, JSON.stringify(updates));
}
