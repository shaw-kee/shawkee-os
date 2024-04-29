import { Position } from '@/types/position';
import { useEffect, useRef } from 'react';

const TILE_COUNT = 20;

const SnakeGame = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getContainerSize = () => {
    const container = containerRef.current;

    if (!container) {
      throw new Error('not found container element');
    }

    const rect = container.getBoundingClientRect();

    return {
      width: rect.width,
      height: rect.height,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      throw new Error('not found canvas element');
    }

    const ctx = canvasRef.current.getContext('2d');

    if (!ctx) {
      throw new Error('not found canvas context');
    }

    let timeoutId: number | null = null;

    const containerSize = getContainerSize();

    const tileSize = canvas.width / TILE_COUNT;

    // TODO: 스타트 위치는 랜덤으로
    let headX = 10;
    let headY = 10;

    const snakeParts: Position[] = [];
    let tailLength = 2;

    let appleX = 5;
    let appleY = 5;

    let inputXVelocity = 0;
    let inputYVelocity = 0;

    let xVelocity = 0;
    let yVelocity = 0;

    let score = 0;
    let speed = 10;

    canvas.width = containerSize.width;
    canvas.height = containerSize.height;

    const drawGame = () => {
      xVelocity = inputXVelocity;
      yVelocity = inputYVelocity;

      changeSnakePosition();

      if (isGameOver()) {
        alert('GameOver !!!');
        return;
      }

      clearScreen();

      checkAppleCollision();
      drawApple();
      drawSnake();

      if (score > 5) {
        speed = 12;
      }
      if (score > 10) {
        speed = 15;
      }

      timeoutId = setTimeout(drawGame, 1000 / speed);
    };

    const isGameOver = () => {
      if (xVelocity === 0 && yVelocity === 0) {
        return false;
      }

      if (headX < 0 || headY < 0 || headX === TILE_COUNT || headY === TILE_COUNT) {
        return true;
      }

      for (const snakePart of snakeParts) {
        if (snakePart.x === headX && snakePart.y === headY) {
          return true;
        }
      }

      return false;
    };

    const clearScreen = () => {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawSnake = () => {
      ctx.fillStyle = 'green';
      snakeParts.forEach((snakePart) => {
        ctx.fillRect(snakePart.x * TILE_COUNT, snakePart.y * TILE_COUNT, tileSize, tileSize);
      });

      snakeParts.push({ x: headX, y: headY });
      while (snakeParts.length > tailLength) {
        snakeParts.shift();
      }

      ctx.fillStyle = 'orange';
      ctx.fillRect(headX * TILE_COUNT, headY * TILE_COUNT, tileSize, tileSize);
    };

    const changeSnakePosition = () => {
      headX = headX + xVelocity;
      headY = headY + yVelocity;
    };

    const drawApple = () => {
      ctx.fillStyle = 'red';
      ctx.fillRect(appleX * TILE_COUNT, appleY * TILE_COUNT, tileSize, tileSize);
    };

    const checkAppleCollision = () => {
      if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * TILE_COUNT);
        appleY = Math.floor(Math.random() * TILE_COUNT);
        tailLength += 1;
        score += 1;
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          if (inputYVelocity === 1) break;
          inputXVelocity = 0;
          inputYVelocity = -1;
          break;
        case 'ArrowDown':
          if (inputYVelocity === -1) break;
          inputXVelocity = 0;
          inputYVelocity = 1;
          break;
        case 'ArrowLeft':
          if (inputXVelocity === 1) break;
          inputXVelocity = -1;
          inputYVelocity = 0;
          break;
        case 'ArrowRight':
          if (inputXVelocity === -1) break;
          inputXVelocity = 1;
          inputYVelocity = 0;
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeydown);

    drawGame();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <div ref={containerRef} className='h-full w-full'>
      <canvas ref={canvasRef} className='border bg-black' />;
    </div>
  );
};

export default SnakeGame;
