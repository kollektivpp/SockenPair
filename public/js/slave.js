$(document).ready(function() {
	var socket = io(),
		masterSocketID = $('#masterSocketID').val(),
		previewImage = $('#previewImage'),
		downloadwrapper = $('#downloadwrapper'),
		previewImageHidden = $('#previewImageHidden');

	socket.emit( 'addSlaveUser', masterSocketID );

	socket.on('successfullyUploadedImage', function(filePath) {
		previewImage.attr('src', filePath);
	});

	socket.on('showImage', function() {
		downloadwrapper.show();
		previewImage.addClass('show');
		previewImageHidden.val(previewImage.attr('src'));
    	downloadwrapper.submit();
	});
});