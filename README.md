##Whats Up Publisher

The publisher of the application used display database, application and internet statuses

Recording data into MongoDb to generate historic response time D3 graphs

Live data updates are pushed via Redis's pubsub and socket.io

##Design Diagram
![Diagram](https://github.com/harrykhh/whats-up/raw/master/images/diagram.png)

![Publisher Detailed Diagram](https://github.com/harrykhh/whats-up/raw/master/images/diagram2.png)

##Software Requirements
1. [Node](http://nodejs.org)
2. [MongoDB](http://www.mongodb.org/)
3. [Redis](http://redis.io/)

##Features

1. Live graph updates with [socket.io](http://socket.io/)

[![Live graph update](http://img.youtube.com/vi/JhCOD53WNPo/0.jpg)](https://www.youtube.com/watch?v=JhCOD53WNPo)

2. Integrated with [passport](http://passportjs.org/)

![Homescreen](https://github.com/harrykhh/whats-up/raw/master/images/1.png)

##Install

1. Clone the repo: `git clone https://github.com/harrykhh/whats-up-publisher.git`.
2. Install with [Node](http://nodejs.org): `npm update`.

##Settings

Config file located at : `config/config.json`

1. Redis port(default 6379) `"redis_port" : "6379"`
2. Redis URL(default localhost) `"redis_url" : "localhost"`
3. MongoDb URL(default mongodb://localhost:27017/stats) `"mongodb_url" : "mongodb://localhost:27017/stats"`
4. MongoDb User(default mongouser) `"mongodb_user" : "mongouser"`
5. MongoDb Password(default password) `"mongodb_password" : "password",`
6. Internetinforation(default Google and Bing) - an array of object which includes the name, id and url of the object.
	
	Example: Google
	
	`{`
		`"name": "Google",`
		`"id": "google",`
		`"url": "http://google.com"`
	`}`

7. DB2inforation - an array of object which includes the name, id and conntion jdbc url of the DB2 object.
	It will use `SELECT * FROM SYSIBM.SYSDUMMY1` to get the response time.
	
	Example:
	
	`{`
		`"name": "DB2 Server Node 1",`
		`"id": "Node1",`
		`"url": "jdbc:db2://<DB2 Server Node 1 address>:<PORT>/<Database>:user=<User>;password=<Password>;"`
	`}`

8. TDinforation - an array of object which includes the name, id and conntion jdbc url of the Teradata object.
	It will use `select * from dbc.dbcinfo` to get the response time.

	Example:
	
	`{`
		`"name": "Teradata Node 1",`
		`"id": "TeradataNode1",`
		`"url": "jdbc:teradata://<Teradata Node 1 address>/USER=<User>,PASSWORD=<Password>"`
	`}`

9. Oracleinforation - an array of object which includes the name, id and conntion jdbc url of the Oracle object.
	It will use `SELECT 1 From dual` to get the response time.
	
	Example:
	
	`{`
		`"name": "Oracle Node 1",`
		`"id": "OraNode1",`
		`"url": "jdbc:oracle:thin:<User>/<Password>@<Oracle Node 1 address>:<PORT>:<SID>"`
	`}`


##Author

**Harry Ho**

+ https://github.com/harrykhh
+ http://www.linkedin.com/pub/harry-ho/43/15a/5a3

##License

The MIT License (MIT)

Copyright (c) [2014] [Harry Ho]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.