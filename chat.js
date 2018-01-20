var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var colors = require('colors');

var port = 2300;
server.listen(port);

console.log('=========================='.red)
console.log('=                        ='.red)
console.log('=      '.red+'Chat Server'.green.bold+'       ='.red)
console.log('=                        ='.red)
console.log('=========================='.red)
console.log('='.red+'   192.168.8.100'.cyan.bold+':'+port.toString().green.bold+'   ='.red)
console.log('=========================='.red)

var mensages = [];
io.on("connection", function(socket) {

	io.sockets.emit("SavedMensages",mensages)  // envia el array de los mensajes guardados
	socket.on("post",function(data){

		mensages.push({text:data.text,
					   hours:data.hours,
					   minutes:data.minutes,
					   secounds:data.secounds,
					   id:socket.id,
					   name: socket.handshake.address == "::ffff:192.168.8.100"?"Marcelo":"Rodrigo"})
		io.sockets.emit("postFromOther", mensages[mensages.length-1]);
		console.log(
			mensages[mensages.length-1].hours.toString().green
			+":".green
			+mensages[mensages.length-1].minutes.toString().green
			+" "+mensages[mensages.length-1].name.toString().red.bold
			+" "+mensages[mensages.length-1].text.yellow.bold)
	})
});
