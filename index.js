var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket){

  const userId = socket.id;

  io.emit('chat message', `A user logged in, id: ${userId}`);

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  
  socket.on('disconnect', function(){
    io.emit('chat message', `User ${userId} logged out`);
  });
  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
})