
var thrift = require('thrift');
// var thriftTransports = thrift.TBufferedTransport();
// var thriftProtocols = require('thrift/protocol');



var scribe = require('./scribe');
var scribeTypes = require('./scribe_types');

var transport = thrift.TBufferedTransport();
var protocol = thrift.TBinaryProtocol();
var connection = thrift.createConnection("localhost", 8080,{
	transport: transport
	,protocol: protocol
});

connection.on('error', function(err) {  
   console.error(err);                   
});                                     

var client = thrift.createClient(scribe, connection);

var message = new scribeTypes.LogEntry({
	category: "hello_category"
	,message: "hello"}
);
var messages = [message];

client.Log(messages, function(err, message) {
	console.log(err, message);
	connection.end();
});





