import { RegData, User, WebSocketWithIds } from "../../types";
import { users } from "../../store";

export function handleReg(ws: WebSocketWithIds, data: RegData) {
  const { name, password } = data;
  const existingUser = [...users.values()].find(u => u.name === name);

  if (existingUser) {
    const isCorrectPassword = existingUser.password === password;

    if (isCorrectPassword) {
      ws.userId = existingUser.index;
    }

    ws.send(JSON.stringify({
      type: 'reg',
      data: {
        name: existingUser.name,
        index: existingUser.index,
        error: !isCorrectPassword,
        errorText: isCorrectPassword ? '' : 'Incorrect password',
      },
      id: 0,
    }));

    return;
  }

  const userId = crypto.randomUUID();
  const user: User = {
    name: data.name,
    password: data.password,
    index: userId,
    ws,
  };

  users.set(userId, user);

  ws.userId = userId;

  ws.send(JSON.stringify({
    type: 'reg',
    data: {
      name: data.name,
      index: userId,
      error: false,
      errorText: '',
    },
    id: 0,
  }));
}
