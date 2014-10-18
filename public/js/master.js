$(document).ready(function() {
	var socket = io(),
		clientID = null,
		connectionHint = $('#connectionHint');

	socket.emit( 'addMasterUser', clientID );

	socket.on('masterUserAdded', function(socketID) {
		if (!clientID) {
			clientID = socketID,
			slaveURL = location.href + 'connectSlaveUser?socketID=' + clientID;

			new QRCode(document.getElementById("qrcode"), slaveURL);
			connectionHint.attr('href', slaveURL);
			connectionHint.show();
			$('#masterSocketID').val(clientID);
		}
	});

	socket.on('slaveUserConnected', function() {
		connectionHint.hide();
		$('#qrcode').hide();
		$('#contentwrapper').show();
	});

	socket.on('successfullyUploadedImage', function(filePath) {
		$('#contentwrapper').hide();
		$('#dragImage').attr('src', filePath);
	});
});