var path = require('path'),
	app = require('express')(),
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

app.get('/', function(req, res) {
	// res.status(200).end();
	res.sendFile( path.join(__dirname, 'index.html') );
});

app.get('/uploadfile', function(req, res) {
	res.render(path.join(__dirname, 'views/upload_form.jade') );
});

app.post('/upload', function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		var oldPath = files.file.path,
			fileSize = files.file.size,
			fileExt = files.file.name.split('.').pop(),
			index = oldPath.lastIndexOf('/') + 1,
			fileName = oldPath.substr(index),
			newPath = path.join(process.env.PWD, '/uploads/', fileName + '.' + fileExt);

			fs.readFile(oldPath, function(err, data) {
				fs.writeFile(newPath, data, function(err) {
					fs.unlink(oldPath, function(err) {
						if (err) {
							res.status(500);
							res.json({'success': false});
						} else {
							res.status(200);
							res.json({'success': true});
						}
					});
				});
			});
	});
});

io.on('connection', function(socket) {
	console.log('user connected');
});

http.listen(8888, function() {
	console.log('listen on port ' + '8888'.rainbow);
});