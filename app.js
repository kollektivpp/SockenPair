var path = require('path'),
	express = require('express'),
	app = express(),
	http = require('http').Server(app),
	colors = require('colors'),
	io = require('socket.io')(http);

// Routing
app.use( express.static(__dirname + '/public') );

app.get('/', function(req, res) {
	// res.status(200).end();
	res.sendFile( 'index.html' );
});

io.on('connection', function(socket) {
	console.log('user connected');

	socket.on('foobar', function(msg) {
		console.log(msg);

		io.emit('foobar', msg);
	});

	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});

http.listen(8888, function() {
	console.log('listen on port ' + '8888'.red);
});