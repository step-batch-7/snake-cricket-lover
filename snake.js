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

  hasTouchedBoundary(noOfCols, noOfRows) {
    const touchedVerticalBoundary =
      this.head[0] < 1 || this.head[0] >= noOfCols - 1;
    const touchedHorizontalBoundary =
      this.head[1] < 1 || this.head[1] >= noOfRows - 1;
    return touchedHorizontalBoundary || touchedVerticalBoundary;
  }

  hasTouchedItself() {
    const otherParts = this.positions.slice(0, this.positions.length - 1);
    return otherParts.some(
      cell => cell[0] === this.head[0] && cell[1] === this.head[1]
    );
  }
}
