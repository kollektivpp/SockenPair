var path = require('path'),
	express = require('express'),
	app = express(),
	http = require('http').Server(app),
	colors = require('colors'),
	io = require('socket.io')(http),
	formidable = require('formidable'),
	fs = require('fs-extra');

function createUploadFolder(arguments) {
	fs.mkdirs(path.join(__dirname, 'uploads'), function(err) {
		if (err) {
			console.error(err);
		}
	});
}

createUploadFolder();

// Routing
app.use( express.static(__dirname + '/public') );

app.get('/', function(req, res) {
	// res.status(200).end();
	res.sendFile( 'index.html' );
});

app.post('/upload', function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		if (err) {
			console.error(err);
			return;
		}
		var file = files.filefield,
			oldPath = file.path,
			fileSize = file.size,
			fileExt = file.name.split('.').pop(),
			index = oldPath.lastIndexOf('/') + 1,
			fileName = oldPath.substr(index),
			newPath = path.join(process.env.PWD, '/uploads/', fileName + '.' + fileExt);

			fs.readFile(oldPath, function(err, data) {
				fs.writeFile(newPath, data, function(err) {
					fs.unlink(oldPath, function(err) {
						if (err) {
							res.status(500);
							res.json({'success': false});
							// TODO: do something if error appears
						} else {
							res.status(200);
							res.json({'success': true});
							// TODO: do something if successfully uploaded
						}
					});
				});
			});
	});
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
	console.log('listen on port ' + '8888'.rainbow);
});