$(document).ready(function() {
	var socket = io(),
	masterSocketID = $('#masterSocketID').val();
	socket.emit( 'addSlaveUser', masterSocketID );

	socket.on('successfullyUploadedImage', function(filePath) {
		$('#dragImage').attr('src', filePath);
	});
});