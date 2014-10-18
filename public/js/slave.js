$(document).ready(function() {
	var socket = io(),
	masterSocketID = $('#masterSocketID').val();
	socket.emit( 'addSlaveUser', masterSocketID );
});