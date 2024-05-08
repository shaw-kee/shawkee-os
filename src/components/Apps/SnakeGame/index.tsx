import SnakeGameManager from '@/utils/snakeGame';
import { useEffect, useRef } from 'react';

const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      throw new Error('not found canvas element');
    }

    const snakeGameManager = new SnakeGameManager(canvas);

    snakeGameManager.drawGame();

    return () => {
      snakeGameManager.drawEnd();
    };
  }, []);

  return (
    <div className='absolute bg-black'>
      <canvas ref={canvasRef} className='bg-black' />
    </div>
  );
};

export default SnakeGame;
