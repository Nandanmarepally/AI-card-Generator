require('dotenv').config();
console.log("Loaded OpenRouter API Key:", process.env.OPENROUTER_API_KEY ? "Yes" : "No");
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const socketHandler = require('./socket');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

socketHandler(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
