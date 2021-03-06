const areCellsEqual = function(cell1, cell2) {
  return cell1[0] === cell2[0] && cell1[1] === cell2[1];
};

class Game {
  constructor(snake, ghostSnake, food, gridDimensions) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.gridDimensions = gridDimensions;
    this.score = 0;
  }

  hasFoodEaten() {
    return areCellsEqual(this.food.position, this.snake.head);
  }

  growSnake() {
    this.snake.grow();
  }

  getUpdatedScore() {
    this.score += 1;
    return this.score;
  }

  get foodPosition() {
    return this.food.position;
  }

  isOver() {
    return (
      this.snake.hasTouchedBoundary(this.gridDimensions) ||
      this.snake.hasTouchedItself()
    );
  }
}
