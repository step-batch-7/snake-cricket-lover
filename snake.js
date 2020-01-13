const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

class Direction {
  constructor(initialHeading) {
    this.heading = initialHeading;
    this.deltas = {};
    this.deltas[EAST] = [1, 0];
    this.deltas[WEST] = [-1, 0];
    this.deltas[NORTH] = [0, -1];
    this.deltas[SOUTH] = [0, 1];
  }

  get delta() {
    return this.deltas[this.heading];
  }

  turnLeft() {
    this.heading = (this.heading + 1) % 4;
  }
}

class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }

  get location() {
    return this.positions.slice();
  }

  get species() {
    return this.type;
  }

  get head() {
    return this.positions[this.positions.length - 1];
  }
  turnLeft() {
    this.direction.turnLeft();
  }

  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();

    const [deltaX, deltaY] = this.direction.delta;

    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  grow() {
    this.positions.unshift(this.previousTail);
  }
}

class Food {
  constructor(colId, rowId) {
    this.colId = colId;
    this.rowId = rowId;
  }

  changePositions() {
    [this.colId, this.rowId] = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 60)
    ];
  }

  get position() {
    return [this.colId, this.rowId];
  }
}

class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
  }

  hasFoodEaten() {
    const [foodX, foodY] = this.food.position;
    const [snakeX, snakeY] = this.snake.head;
    return foodX === snakeX && foodY === snakeY;
  }
}

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

const generateNewFood = function(food) {
  removePreviousFood(food.position);
  food.changePositions();
  drawFood(food);
};

const drawFood = function(food) {
  let [foodX, foodY] = food.position;
  const cell = getCell(foodX, foodY);
  cell.classList.add('food');
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

const updateGameStatus = game => {
  if (game.hasFoodEaten()) {
    generateNewFood(game.food);
    game.snake.grow();
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

const main = function() {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = new Food(5, 5);
  const game = new Game(snake, ghostSnake, food);

  setup(game);

  setInterval(updateGameStatus, 100, game);
  setInterval(randomlyTurnSnake, 500, game.ghostSnake);
};
