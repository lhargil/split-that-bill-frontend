export class IdGenerator {
  static generate(max: number, min: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  private constructor() { }
}
