import { WebSocketServer } from 'ws';

import { handleReg } from './handlers/auth/handleReg';
import { handleCreateGame } from './handlers/handleCreateGame';
import { handleJoin } from './handlers/handleJoin';

const envPort = process.env.PORT;
const PORT = envPort ? parseInt(envPort) : 3000;

const wss = new WebSocketServer({ port: PORT});

console.log(`WebSocket server is running at ws://localhost:${PORT}`);

wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('message', message => {
    const { type, data, id } = JSON.parse(message.toString());
    
    switch (type) {
      case 'reg':
        handleReg(ws, data);
        break;
      case 'create_game':
        handleCreateGame(ws, data);
        break;
      case 'join_game':
        handleJoin(ws, data);
        break;
      default:
        console.log('WebSocket message has invalid type');
    }
  });
});