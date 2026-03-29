import { Game, WSMessage } from "../types";

export function broadcast(game: Game, message: WSMessage) {
  game.players.forEach(player => {
    if (player.ws) {
      player.ws.send(JSON.stringify(message));
    }
  });
}
