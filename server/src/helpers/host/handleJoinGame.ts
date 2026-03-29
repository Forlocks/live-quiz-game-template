import { games, users } from "../../store";
import { Game, JoinGameData, Player, WebSocketWithIds } from "../../types";
import { broadcast } from "../broadcast";

export function handleJoinGame(ws: WebSocketWithIds, data: JoinGameData) {
  const { code } = data;

  const game = [...games.values()].find((g: Game) => g.code === code);
  const user = users.get(ws.userId);

  const alreadyInGame = game.players.some((p: Player) => p.index === user.index);

  if (alreadyInGame) {
    return;
  }

  const player: Player = {
    name: user.name,
    index: user.index,
    score: 0,
    ws,
  };

  game.players.push(player);

  ws.gameId = game.id;

  ws.send(JSON.stringify({
    type: 'game_joined',
    data: {
      gameId: game.id,
    },
    id: 0,
  }));

  broadcast(game, {
    type: 'player_joined',
    data: {
      playerName: player.name,
      playerCount: game.players.length,
    },
    id: 0,
  });

  broadcast(game, {
    type: 'update_players',
    data: game.players.map((p: Player) => ({
      name: p.name,
      index: p.index,
      score: p.score,
    })),
    id: 0,
  });
}
