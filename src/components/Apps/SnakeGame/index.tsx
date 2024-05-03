import SnakeGameManager from '@/utils/snakeGame';
import { useEffect, useRef } from 'react';

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

    const snakeGameManager = new SnakeGameManager(canvas);
    const containerSize = getContainerSize();
    snakeGameManager.setCanvasSize(containerSize);
    snakeGameManager.drawGame();

    return () => {
      snakeGameManager.drawEnd();
    };
  }, []);

  return (
    <div ref={containerRef} className='w-ful h-full '>
      <canvas ref={canvasRef} className='border bg-black' />
    </div>
  );
};

export default SnakeGame;
