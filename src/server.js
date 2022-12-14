import http from 'http';
import WebSocket from 'ws';
import express from 'express';
import livereloadMiddleware from 'connect-livereload';
import livereload from 'livereload';

const app = express();

const liveServer = livereload.createServer({
  exts: ['js', 'pug', 'css'],
  delay: 1000,
});

liveServer.watch(__dirname);

app.use(livereloadMiddleware());

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));

const handleListen = () => console.log(`Listening on http:localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];
//fake database

wss.on('connection', (socket) => {
  sockets.push(socket);
  console.log('Connected to Browser');
  socket.on('close', () => console.log('Disconneted from the Browser ❌'));
  socket.on('message', (message) => {
    sockets.forEach((aSocket) => aSocket.send(message.toString('utf8')));
  });
});

server.listen(3000, handleListen);
