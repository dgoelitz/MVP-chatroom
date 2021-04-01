const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const http = require('http').Server(app);
const io = require('socket.io')(http);

const postMessage = require('../database/queries');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/mainroom', (req, res) => {
  res.send('We are on home!')
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log(msg.user + ': ' + msg.message);
    postMessage(msg.user, msg.message);
    io.emit('chat message', msg);
  });
});

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});;