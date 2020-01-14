class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.score = 0;
  }

  hasFoodEaten() {
    const [foodX, foodY] = this.food.position;
    const [snakeX, snakeY] = this.snake.head;
    return foodX === snakeX && foodY === snakeY;
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
