$(document).ready(function() {
	var socket = io(),
		masterSocketID = $('#masterSocketID').val(),
		previewImage = $('#previewImage'),
		screenWidth = window.innerWidth;

	socket.emit( 'addSlaveUser', masterSocketID );

	socket.on('successfullyUploadedImage', function(filePath) {
		previewImage.attr('src', filePath);
		// previewImage.css('left', -previewImage.width());
	});

	socket.on('showImage', function(viewportDelta) {
		// var xPos = parseInt(previewImage.css('right'), 10);
		previewImage.css('right', screenWidth + viewportDelta);
	});
});