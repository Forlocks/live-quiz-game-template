import { users } from "../store";
import { Game, WSMessage } from "../types";

export function broadcast(game: Game, message: WSMessage) {
  const msg = JSON.stringify(message);
  const host = users.get(game.hostId);

  game.players.forEach(player => {
    if (player.ws) {
      player.ws.send(msg);
    }
  });

  host.ws.send(msg);
}
