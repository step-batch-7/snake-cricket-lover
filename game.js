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
