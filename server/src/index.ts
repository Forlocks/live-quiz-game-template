import { WebSocketServer } from 'ws';
import { handleReg } from './helpers/auth/handleReg';
import { handleCreateGame } from './helpers/host/handleCreateGame';
import { WebSocketWithIds } from './types';
import { handleJoinGame } from './helpers/host/handleJoinGame';

const envPort = process.env.PORT;
const PORT = envPort ? parseInt(envPort) : 3000;

const wss = new WebSocketServer({ port: PORT});

console.log(`WebSocket server is running at ws://localhost:${PORT}`);

wss.on('connection', (ws: WebSocketWithIds)  => {
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
        handleJoinGame(ws, data);
        break;
      default:
        console.log('WebSocket message has invalid type');
    }
  });
});