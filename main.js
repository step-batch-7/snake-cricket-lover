const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + '_' + rowId;

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const createCell = function(grid, colId, rowId) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function() {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const eraseTail = function(snake) {
  let [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.species);
};

const drawSnake = function(snake) {
  snake.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.species);
  });
};

const removePreviousFood = function(position) {
  const [colId, rowId] = position;
  const cell = getCell(colId, rowId);
  cell.classList.remove('food');
};

const generateNewFood = function(game) {
  removePreviousFood(game.food.position);
  const [foodX, foodY] = [
    Math.round(Math.random() * NUM_OF_COLS),
    Math.round(Math.random() * NUM_OF_ROWS)
  ];
  game.food = new Food(foodX, foodY);
  drawFood(game.food);
};

const drawFood = function(food) {
  let [foodX, foodY] = food.position;
  const cell = getCell(foodX, foodY);
  cell.classList.add('food');
};

const clearGameBoard = function() {
  const grid = document.getElementById('grid');
  // console.log(document.getElementsByTagName('body')[0]);
  document.body.removeChild(grid);
};

const gameOverPanel = function() {
  const gameOver = document.createElement('p');
  gameOver.innerText = 'GAME OVER';
  gameOver.id = 'gameOver';
  document.body.appendChild(gameOver);
};

const handleKeyPress = snake => {
  snake.turnLeft();
};

const moveAndDrawSnake = function(snake) {
  snake.move();
  eraseTail(snake);
  drawSnake(snake);
};

const attachEventListeners = snake => {
  document.body.onkeydown = handleKeyPress.bind(null, snake);
};

const initSnake = () => {
  const snakePosition = [
    [40, 25],
    [41, 25],
    [42, 25]
  ];
  return new Snake(snakePosition, new Direction(EAST), 'snake');
};

const initGhostSnake = () => {
  const ghostSnakePosition = [
    [40, 30],
    [41, 30],
    [42, 30]
  ];
  return new Snake(ghostSnakePosition, new Direction(SOUTH), 'ghost');
};

const setup = game => {
  attachEventListeners(game.snake);
  createGrids();
  drawFood(game.food);

  drawSnake(game.snake);
  drawSnake(game.ghostSnake);
};

const updateScoreBoard = function(score) {
  const scoreBoard = document.getElementById('scoreBoard');
  scoreBoard.innerText = `Score is: ${score}`;
};

const updateGameStatus = game => {
  if (game.hasFoodEaten()) {
    generateNewFood(game);
    game.snake.grow();
    const score = game.getUpdatedScore();
    updateScoreBoard(score);
  }
  if (game.isOver(NUM_OF_COLS, NUM_OF_ROWS)) {
    clearGameBoard();
    gameOverPanel();
    clearInterval(intervalId);
    return;
  }
  moveAndDrawSnake(game.snake);
  moveAndDrawSnake(game.ghostSnake);
};

const randomlyTurnSnake = snake => {
  let x = Math.random() * 100;
  if (x > 50) {
    snake.turnLeft();
  }
};

let intervalId;

const main = function() {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = new Food(5, 5);
  const game = new Game(snake, ghostSnake, food);

  setup(game);

  intervalId = setInterval(updateGameStatus, 200, game);
  setInterval(randomlyTurnSnake, 500, game.ghostSnake);
};
