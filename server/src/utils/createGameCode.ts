export function createGameCode() {
  const CODE_LENGTH = 6;
  const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  let code = '';
  
  for (let i = 0;  i < CODE_LENGTH; i++) {
    code += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
  }

  return code;
}
