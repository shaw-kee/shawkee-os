import { Position } from '@/types/position';

export const TILE_COUNT = 20;

export default class SnakeGame {
  #headPosition: Position;
  #applePosition: Position;

  #inputVelocity: Position;
  #velocity: Position;

  #score: number;
  #speed: number;

  constructor() {
    this.#headPosition = this.#getRandomPosition();
    this.#applePosition = this.#getRandomPosition();

    this.#inputVelocity = { x: 0, y: 0 };
    this.#velocity = { x: 0, y: 0 };

    this.#score = 0;
    this.#speed = 10;
  }

  #getRandomPosition() {
    return { x: Math.floor(Math.random() * TILE_COUNT), y: Math.floor(Math.random() * TILE_COUNT) };
  }
}
