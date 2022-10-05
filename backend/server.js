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

const WebSocket = require('ws');
const ws = new WebSocket.Server({ port: 3030 });

ws.on('connection', function connection(wsConnection) {
  wsConnection.on('message', function incoming(message) {
    console.log(`Server Received: ${message}`);
    wsConnection.send(message.toString());
  });
});
