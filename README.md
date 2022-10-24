# Text adventure

This is a tiny text adventure game that can be played in the developer console of a web browser.

## Code

The main code for the game is in `src/Main.ts`.

The built-in `prompt` function is used to ask for player input. It returns `null` if the player clicks "Cancel" in the prompt.

To output, we use `console` functions:
- `console.info`: informing the player about their surroundings
- `console.log`: echoing player input
- `console.warn`: asking for player input
- `console.error`: indicating invalid player input

## Winning moves

Here is the shortest sequence of winning moves:

1. `east`
2. `take key`
3. `west`
4. `south`
5. `open window`
6. `east`