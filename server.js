const express = require('express');
const http = require('http');
const { Server} = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/build')));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('offer', (data) => {
        socket.broadcast.emit('offer', data);
    });

    socket.on('answer', (data) => {
        socket.broadcast.emit('answer', data);
    });

    socket.on('candidate', (data) => {
        socket.broadcast.emit('candidate', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/user',(req,res) =>{
    res.send("Hello There!");
})

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});
