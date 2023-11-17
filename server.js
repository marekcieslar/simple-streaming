const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Nowe połączenie');

  socket.on('image', (data) => {
    const base64Data = data.replace(/^data:image\/png;base64,/, '');

    fs.writeFile(
      `images/image_${Date.now()}.png`,
      base64Data,
      'base64',
      (err) => {
        if (err) {
          console.error('Błąd podczas zapisywania obrazu:', err);
        } else {
          console.log('Obraz zapisany pomyślnie!');
        }
      }
    );
  });
});

server.listen(3000, () => {
  console.log('Serwer działa na porcie 3000');
});
