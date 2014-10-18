$(document).ready(function() {
	var socket = io(),
		masterSocketID = $('#masterSocketID').val(),
		previewImage = $('#previewImage');

	socket.emit( 'addSlaveUser', masterSocketID );

	socket.on('successfullyUploadedImage', function(filePath) {
		previewImage.attr('src', filePath);
	});

	socket.on('showImage', function(filePath) {
		$('#downloadwrapper').show();
		previewImage.addClass('show');
	});
});