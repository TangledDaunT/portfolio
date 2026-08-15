import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const CELL_SIZE = 20;
const GRID_WIDTH = 19;
const GRID_HEIGHT = 21;
const GAME_SPEED = 150;

// Simple maze layout (1 = wall, 0 = path, 2 = dot, 3 = power pellet)
const MAZE_TEMPLATE = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,3,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,3,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,0,1,0,1,1,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,0,1,1,0,1,1,0,1,2,1,1,1,1],
  [0,0,0,0,2,0,0,1,0,0,0,1,0,0,2,0,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,3,2,1,2,2,2,2,2,0,2,2,2,2,2,1,2,3,1],
  [1,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

interface Position {
  x: number;
  y: number;
}

interface Ghost {
  pos: Position;
  color: string;
}

const PacmanGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const mazeRef = useRef<number[][]>([]);

  // Game state refs
  const pacmanRef = useRef<Position>({ x: 9, y: 15 });
  const ghostsRef = useRef<Ghost[]>([]);
  const dotsRef = useRef<Set<string>>(new Set());
  const gameLoopRef = useRef<number>();
  const directionRef = useRef<{ dx: number; dy: number }>({ dx: 0, dy: 0 });
  const keysPressedRef = useRef<Set<string>>(new Set());

  const initGame = useCallback(() => {
    // Deep copy maze
    mazeRef.current = MAZE_TEMPLATE.map(row => [...row]);
    pacmanRef.current = { x: 9, y: 15 };
    ghostsRef.current = [
      { pos: { x: 9, y: 9 }, color: '#FF0000' },
      { pos: { x: 8, y: 9 }, color: '#FFB8FF' },
      { pos: { x: 10, y: 9 }, color: '#00FFFF' },
      { pos: { x: 9, y: 8 }, color: '#FFB852' },
    ];

    // Initialize dots
    dotsRef.current.clear();
    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        if (mazeRef.current[y][x] === 2 || mazeRef.current[y][x] === 3) {
          dotsRef.current.add(`${x},${y}`);
        }
      }
    }

    setScore(0);
    setGameOver(false);
    setGameWon(false);
    setIsPlaying(true);
    directionRef.current = { dx: 0, dy: 0 };
    keysPressedRef.current.clear();
  }, []);

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0C0C0C';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw maze
    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        const cell = mazeRef.current[y][x];

        if (cell === 1) {
          // Wall
          ctx.fillStyle = '#1E3A8A';
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          ctx.strokeStyle = '#3B82F6';
          ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        } else if (dotsRef.current.has(`${x},${y}`)) {
          // Dot
          if (MAZE_TEMPLATE[y][x] === 3) {
            // Power pellet
            ctx.fillStyle = '#BBCCD7';
            ctx.beginPath();
            ctx.arc(
              x * CELL_SIZE + CELL_SIZE / 2,
              y * CELL_SIZE + CELL_SIZE / 2,
              6,
              0,
              Math.PI * 2
            );
            ctx.fill();
          } else {
            // Regular dot
            ctx.fillStyle = '#D7E2EA';
            ctx.beginPath();
            ctx.arc(
              x * CELL_SIZE + CELL_SIZE / 2,
              y * CELL_SIZE + CELL_SIZE / 2,
              2,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        }
      }
    }

    // Draw ghosts
    ghostsRef.current.forEach((ghost) => {
      ctx.fillStyle = ghost.color;
      ctx.beginPath();
      ctx.arc(
        ghost.pos.x * CELL_SIZE + CELL_SIZE / 2,
        ghost.pos.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        Math.PI,
        0,
        false
      );
      ctx.lineTo(ghost.pos.x * CELL_SIZE + CELL_SIZE - 2, ghost.pos.y * CELL_SIZE + CELL_SIZE - 2);
      ctx.lineTo(ghost.pos.x * CELL_SIZE + CELL_SIZE / 2, ghost.pos.y * CELL_SIZE + CELL_SIZE - 5);
      ctx.lineTo(ghost.pos.x * CELL_SIZE + 2, ghost.pos.y * CELL_SIZE + CELL_SIZE - 2);
      ctx.closePath();
      ctx.fill();
    });

    // Draw Pacman
    const pacman = pacmanRef.current;
    ctx.fillStyle = '#FBBF24';
    ctx.beginPath();
    const mouthAngle = 0.2 * Math.PI;
    const startAngle = mouthAngle;
    const endAngle = 2 * Math.PI - mouthAngle;
    ctx.arc(
      pacman.x * CELL_SIZE + CELL_SIZE / 2,
      pacman.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      startAngle,
      endAngle,
      false
    );
    ctx.lineTo(pacman.x * CELL_SIZE + CELL_SIZE / 2, pacman.y * CELL_SIZE + CELL_SIZE / 2);
    ctx.fill();
  }, []);

  const movePacman = useCallback(() => {
    const pacman = pacmanRef.current;

    // Use the current direction from keys pressed
    let dx = 0;
    let dy = 0;

    if (keysPressedRef.current.has('up')) dy = -1;
    else if (keysPressedRef.current.has('down')) dy = 1;
    else if (keysPressedRef.current.has('left')) dx = -1;
    else if (keysPressedRef.current.has('right')) dx = 1;

    const newX = pacman.x + dx;
    const newY = pacman.y + dy;

    // Check if move is valid
    if (
      newX >= 0 &&
      newX < GRID_WIDTH &&
      newY >= 0 &&
      newY < GRID_HEIGHT &&
      mazeRef.current[newY][newX] !== 1
    ) {
      pacman.x = newX;
      pacman.y = newY;

      // Check if eaten a dot
      const key = `${newX},${newY}`;
      if (dotsRef.current.has(key)) {
        dotsRef.current.delete(key);
        setScore((prev) => prev + (MAZE_TEMPLATE[newY][newX] === 3 ? 50 : 10));

        // Check win
        if (dotsRef.current.size === 0) {
          setGameWon(true);
          setIsPlaying(false);
        }
      }
    }
  }, []);

  const moveGhosts = useCallback(() => {
    // Simple ghost AI: random movement
    ghostsRef.current.forEach((ghost) => {
      const directions = [
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
      ];

      const validMoves = directions.filter((dir) => {
        const newX = ghost.pos.x + dir.dx;
        const newY = ghost.pos.y + dir.dy;
        return (
          newX >= 0 &&
          newX < GRID_WIDTH &&
          newY >= 0 &&
          newY < GRID_HEIGHT &&
          mazeRef.current[newY][newX] !== 1
        );
      });

      if (validMoves.length > 0) {
        const move = validMoves[Math.floor(Math.random() * validMoves.length)];
        ghost.pos.x += move.dx;
        ghost.pos.y += move.dy;
      }

      // Check collision with pacman
      if (ghost.pos.x === pacmanRef.current.x && ghost.pos.y === pacmanRef.current.y) {
        setGameOver(true);
        setIsPlaying(false);
      }
    });
  }, []);

  const gameLoop = useCallback(() => {
    movePacman();
    moveGhosts();
    drawGame();

    if (isPlaying) {
      gameLoopRef.current = window.setTimeout(gameLoop, GAME_SPEED);
    }
  }, [movePacman, moveGhosts, drawGame, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      gameLoopRef.current = window.setTimeout(gameLoop, GAME_SPEED);
    }

    return () => {
      if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current);
      }
    };
  }, [isPlaying, gameLoop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      const key = e.key.toLowerCase();
      if (key === 'arrowup' || key === 'w') {
        keysPressedRef.current.add('up');
      } else if (key === 'arrowdown' || key === 's') {
        keysPressedRef.current.add('down');
      } else if (key === 'arrowleft' || key === 'a') {
        keysPressedRef.current.add('left');
      } else if (key === 'arrowright' || key === 'd') {
        keysPressedRef.current.add('right');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'arrowup' || key === 'w') {
        keysPressedRef.current.delete('up');
      } else if (key === 'arrowdown' || key === 's') {
        keysPressedRef.current.delete('down');
      } else if (key === 'arrowleft' || key === 'a') {
        keysPressedRef.current.delete('left');
      } else if (key === 'arrowright' || key === 'd') {
        keysPressedRef.current.delete('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying]);

  // Intersection observer to pause game when out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && gameLoopRef.current) {
          clearTimeout(gameLoopRef.current);
          setIsPlaying(false);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleTouchControlDown = (direction: 'up' | 'down' | 'left' | 'right') => {
    keysPressedRef.current.add(direction);
  };

  const handleTouchControlUp = (direction: 'up' | 'down' | 'left' | 'right') => {
    keysPressedRef.current.delete(direction);
  };

  return (
    <div ref={containerRef} className="bg-[#0C0C0C] rounded-3xl p-6 border-2 border-[#D7E2EA]/20">
      <div className="flex flex-col items-center gap-6">
        {/* Score */}
        <div className="flex items-center justify-between w-full max-w-md">
          <div className="text-[#D7E2EA]">
            <span className="font-light text-sm uppercase tracking-wider">Score:</span>
            <span className="font-bold text-2xl ml-2">{score}</span>
          </div>

          {!isPlaying && !gameOver && !gameWon && (
            <button
              onClick={initGame}
              className="px-6 py-2 bg-gradient-to-r from-[#646973] to-[#BBCCD7] text-[#0C0C0C] font-semibold rounded-full hover:opacity-90 transition-opacity"
              aria-label="Start game"
            >
              Start
            </button>
          )}

          {(gameOver || gameWon) && (
            <button
              onClick={initGame}
              className="px-6 py-2 bg-gradient-to-r from-[#646973] to-[#BBCCD7] text-[#0C0C0C] font-semibold rounded-full hover:opacity-90 transition-opacity"
              aria-label="Play again"
            >
              Play Again
            </button>
          )}
        </div>

        {/* Game Canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={GRID_WIDTH * CELL_SIZE}
            height={GRID_HEIGHT * CELL_SIZE}
            className="rounded-lg"
          />

          {/* Game Over Overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-[#0C0C0C]/90 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <p className="text-[#D7E2EA] font-bold text-3xl mb-2">Game Over!</p>
                <p className="text-[#D7E2EA]/60">Final Score: {score}</p>
              </div>
            </div>
          )}

          {/* Win Overlay */}
          {gameWon && (
            <div className="absolute inset-0 bg-[#0C0C0C]/90 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <p className="text-[#D7E2EA] font-bold text-3xl mb-2">You Win!</p>
                <p className="text-[#D7E2EA]/60">Score: {score}</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="grid grid-cols-3 gap-2 md:hidden">
          <div />
          <button
            onTouchStart={() => handleTouchControlDown('up')}
            onTouchEnd={() => handleTouchControlUp('up')}
            onMouseDown={() => handleTouchControlDown('up')}
            onMouseUp={() => handleTouchControlUp('up')}
            onMouseLeave={() => handleTouchControlUp('up')}
            className="p-4 bg-[#D7E2EA]/10 rounded-lg active:bg-[#D7E2EA]/20 transition-colors"
            aria-label="Move up"
          >
            <svg className="w-6 h-6 text-[#D7E2EA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <div />
          <button
            onTouchStart={() => handleTouchControlDown('left')}
            onTouchEnd={() => handleTouchControlUp('left')}
            onMouseDown={() => handleTouchControlDown('left')}
            onMouseUp={() => handleTouchControlUp('left')}
            onMouseLeave={() => handleTouchControlUp('left')}
            className="p-4 bg-[#D7E2EA]/10 rounded-lg active:bg-[#D7E2EA]/20 transition-colors"
            aria-label="Move left"
          >
            <svg className="w-6 h-6 text-[#D7E2EA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div />
          <button
            onTouchStart={() => handleTouchControlDown('right')}
            onTouchEnd={() => handleTouchControlUp('right')}
            onMouseDown={() => handleTouchControlDown('right')}
            onMouseUp={() => handleTouchControlUp('right')}
            onMouseLeave={() => handleTouchControlUp('right')}
            className="p-4 bg-[#D7E2EA]/10 rounded-lg active:bg-[#D7E2EA]/20 transition-colors"
            aria-label="Move right"
          >
            <svg className="w-6 h-6 text-[#D7E2EA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div />
          <button
            onTouchStart={() => handleTouchControlDown('down')}
            onTouchEnd={() => handleTouchControlUp('down')}
            onMouseDown={() => handleTouchControlDown('down')}
            onMouseUp={() => handleTouchControlUp('down')}
            onMouseLeave={() => handleTouchControlUp('down')}
            className="p-4 bg-[#D7E2EA]/10 rounded-lg active:bg-[#D7E2EA]/20 transition-colors"
            aria-label="Move down"
          >
            <svg className="w-6 h-6 text-[#D7E2EA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div />
        </div>

        {/* Instructions */}
        <div className="text-center text-[#D7E2EA]/50 font-light text-sm">
          <p className="hidden md:block">Hold arrow keys or WASD to move</p>
          <p className="md:hidden">Hold buttons to move</p>
        </div>
      </div>
    </div>
  );
};

const PacmanGameWrapper = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !showGame) {
          setShowGame(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [showGame]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {showGame ? <PacmanGame /> : <div className="h-96" />}
    </motion.div>
  );
};

export default PacmanGameWrapper;
