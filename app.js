var thrift = require('thrift');
var datasource = require('./datasource');
var datasourceTypes = require('./datasource_types');

var transport = thrift.TBufferedTransport();
var protocol = thrift.TBinaryProtocol();
var connection = thrift.createConnection("localhost", 8080,{
	transport: transport
	,protocol: protocol
});

connection.on('error', function(err) {
	console.error(err);
});

var client = thrift.createClient(datasource, connection);

var message = new datasourceTypes.Entry({
	classname: "testclassname2",
	methodname: "methodname"
});

client.query(message, function(err, m) {
	if(null === err){
		console.log(m);
	}
	connection.end();
});

