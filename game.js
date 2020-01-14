const areCellsEqual = function(cell1, cell2) {
  return cell1[0] === cell2[0] && cell1[1] === cell2[1];
};

class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.score = 0;
  }

  hasFoodEaten() {
    return areCellsEqual(this.food.position, this.snake.head);
  }
  getUpdatedScore() {
    this.score += 1;
    return this.score;
  }

  isOver(noOfCols, noOfRows) {
    return (
      this.snake.hasTouchedBoundary(noOfCols, noOfRows) ||
      this.snake.hasTouchedItself()
    );
  }
}
