var path = require('path'),
	express = require('express'),
	app = express(),
	http = require('http').Server(app),
	colors = require('colors'),
	port = process.env.PORT || 8888,
	io = require('socket.io')(http),
	formidable = require('formidable'),
	fs = require('fs-extra'),
	connectedUser = {};

function createUploadFolder() {
	fs.mkdirs(path.join(__dirname, 'uploads'), function(err) {
		if (err) {
			console.error(err);
		}
	});
}

createUploadFolder();

// Routing
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
	res.render('master.html');
});
app.get('/connectSlaveUser', function(req, res) {
	var requestedConnectionID = req.param('socketID');
	res.render('slave.html', { socketID: requestedConnectionID });
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

	socket.on('addMasterUser', function(user) {
		connectedUser[socket.id] = [socket.id];
		io.emit('masterUserAdded', socket.id);
	});
	socket.on('addSlaveUser', function(mastSocketID) {
		connectedUser[mastSocketID].push(socket.id);
		io.sockets.connected[mastSocketID].emit('slaveUserConnected');
	});

	socket.on('disconnect', function() {
		//TODO: make sure to inform master or slave that the counterpart has disconnected
		//TODO: remove them from connectedUser array
	});
});

http.listen(8888, function() {
	console.log('listen on port ' + '8888'.rainbow);
});