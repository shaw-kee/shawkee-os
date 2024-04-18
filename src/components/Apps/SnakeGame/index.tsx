import { useEffect, useRef } from 'react';

const SPEED = 10;

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
    let headX = 5;
    let headY = 5;

    let xVelocity = 0;
    let yVelocity = 0;

    canvas.width = containerSize.width;
    canvas.height = containerSize.height;

    const drawGame = () => {
      console.log('draw!');
      changeSnakePosition();
      clearScreen();
      drawSnake();
      timeoutId = setTimeout(drawGame, 1000 / SPEED);
    };

    const clearScreen = () => {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawSnake = () => {
      ctx.fillStyle = 'green';
      ctx.fillRect(headX * TILE_COUNT, headY * TILE_COUNT, tileSize, tileSize);
    };

    const changeSnakePosition = () => {
      headX = headX + xVelocity;
      headY = headY + yVelocity;
    };

    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          xVelocity = 0;
          yVelocity = -1;
          break;
        case 'ArrowDown':
          xVelocity = 0;
          yVelocity = 1;
          break;
        case 'ArrowLeft':
          xVelocity = -1;
          yVelocity = 0;
          break;
        case 'ArrowRight':
          xVelocity = 1;
          yVelocity = 0;
          break;
      }
      // up
      console.log(event.key);
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
      <canvas ref={canvasRef} className='border border-black bg-black' />;
    </div>
  );
};

export default SnakeGame;
