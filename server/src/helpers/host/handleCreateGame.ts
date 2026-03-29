import { CreateGameData, Game, WebSocketWithIds } from "../../types";
import { createGameCode } from "../../utils/createGameCode";
import { games } from "../../store";

export function handleCreateGame(ws: WebSocketWithIds, data: CreateGameData) {
  if (!ws.userId) {
    return;
  }

  const { questions } = data;

  const gameId = crypto.randomUUID();
  const gameCode = createGameCode();

  const game: Game = {
    id: gameId,
    code: gameCode,
    hostId: ws.userId,
    questions,
    players: [],
    currentQuestion: -1,
    status: 'waiting',
    playerAnswers: new Map(),
  };

  games.set(gameId, game);

  ws.send(JSON.stringify({
    type: 'game_created',
    data: {
      gameId,
      code: gameCode,
    },
    id: 0,
  }));
}
