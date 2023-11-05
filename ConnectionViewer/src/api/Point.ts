/**
 * Point represents a position.
 */
export class Point {
  x: number;
  y: number;
  /**
   * Constructors that specify the location of the X and Y coordinates
   * @param x Position of X coordinate
   * @param y Position of Y coordinate
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static diff(p1: Point, p2: Point): Point {
    return new Point(p1.x - p2.x, p1.y - p2.y);
  }
}