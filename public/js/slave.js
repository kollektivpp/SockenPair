$(document).ready(function() {
	var socket = io(),
		masterSocketID = $('#masterSocketID').val(),
		previewImage = $('#previewImage'),
		screenWidth = window.innerWidth,
		downloadwrapper = $('#downloadwrapper'),
		previewImageHidden = $('#previewImageHidden');

	socket.emit( 'addSlaveUser', masterSocketID );

	socket.on('successfullyUploadedImage', function(filePath) {
		previewImage.attr('src', filePath);
	});

	socket.on('showImage', function(viewportDelta) {
		downloadwrapper.show();
		// previewImage.addClass('show');
		previewImageHidden.val(previewImage.attr('src'));
		// downloadwrapper.submit();

		downloadwrapper.css('right', screenWidth + viewportDelta);
	});
});