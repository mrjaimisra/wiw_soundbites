const express = require('express');

const PORT = process.env.PORT || 3030;
const INDEX = 'src/App.js';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const WebSocket = require('ws');
const ws = new WebSocket.Server({ server });

ws.on('connection', function connection(wsConnection) {
  wsConnection.on('message', function incoming(message) {
    console.log(`Server Received: ${message}`);
    wsConnection.send(message.toString());
  });
});

// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 3030 });

// wss.on('connection', function connection(ws) {
//   console.log("connected");

//   ws.on('message', function incoming(data) {
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(data);
//       }
//     });
//   });
// });
