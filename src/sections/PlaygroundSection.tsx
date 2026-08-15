import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import PacmanGame from '../components/PacmanGame';

// Dice Roller Component
const DiceRoller = () => {
  const [dice, setDice] = useState([1, 1]);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);
    setTimeout(() => {
      setDice([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ]);
      setRolling(false);
    }, 500);
  };

  const diceFaces = [
    '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'
  ];

  return (
    <div className="bg-[#0C0C0C] rounded-3xl p-8 border-2 border-[#D7E2EA]/20">
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-8">
          {dice.map((d, i) => (
            <motion.div
              key={i}
              animate={{ rotate: rolling ? 360 : 0 }}
              transition={{ duration: 0.5 }}
              className="text-[120px] text-[#D7E2EA]"
            >
              {diceFaces[d - 1]}
            </motion.div>
          ))}
        </div>
        <div className="text-[#D7E2EA] text-2xl font-bold">
          Total: {dice[0] + dice[1]}
        </div>
        <button
          onClick={rollDice}
          disabled={rolling}
          className="px-8 py-3 bg-gradient-to-r from-[#646973] to-[#BBCCD7] text-[#0C0C0C] font-semibold rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {rolling ? 'Rolling...' : 'Roll Dice'}
        </button>
      </div>
    </div>
  );
};

// Color Generator Component
const ColorGenerator = () => {
  const [palette, setPalette] = useState([
    '#646973', '#BBCCD7', '#0C0C0C', '#D7E2EA', '#B600A8'
  ]);

  const generatePalette = () => {
    const newPalette = [];
    for (let i = 0; i < 5; i++) {
      const hue = Math.floor(Math.random() * 360);
      const saturation = 30 + Math.floor(Math.random() * 50);
      const lightness = 20 + Math.floor(Math.random() * 60);
      newPalette.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
    setPalette(newPalette);
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  return (
    <div className="bg-[#0C0C0C] rounded-3xl p-8 border-2 border-[#D7E2EA]/20">
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-4 w-full max-w-xl">
          {palette.map((color, i) => (
            <motion.button
              key={i}
              className="flex-1 h-24 rounded-lg cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              onClick={() => copyColor(color)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Click to copy"
            >
              <div className="h-full flex items-end justify-center pb-2">
                <span className="text-xs font-mono bg-black/20 px-2 py-1 rounded" style={{ color: '#fff' }}>
                  {color}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
        <button
          onClick={generatePalette}
          className="px-8 py-3 bg-gradient-to-r from-[#646973] to-[#BBCCD7] text-[#0C0C0C] font-semibold rounded-full hover:opacity-90 transition-opacity"
        >
          Generate New Palette
        </button>
      </div>
    </div>
  );
};

const PlaygroundSection = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    {
      id: 'pacman',
      name: 'Pac-Man',
      description: 'Classic arcade game - eat all dots while avoiding ghosts!',
      icon: '🎮',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'dice',
      name: 'Dice Roller',
      description: 'Roll virtual dice for fun or decision making',
      icon: '🎲',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 'colors',
      name: 'Color Generator',
      description: 'Generate beautiful color palettes for design',
      icon: '🎨',
      gradient: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <section className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2
            className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Playground
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={30}>
          <p className="text-center text-[#0C0C0C]/60 font-light text-lg mb-12 max-w-2xl mx-auto">
            Take a break and play some mini-games! Built with vanilla JS and Canvas API.
          </p>
        </FadeIn>

        {/* Game Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {games.map((game) => (
            <motion.button
              key={game.id}
              onClick={() => setActiveGame(activeGame === game.id ? null : game.id)}
              className={`relative p-6 rounded-3xl bg-gradient-to-br ${game.gradient} text-white text-left transform transition-all ${
                activeGame === game.id ? 'scale-105' : 'hover:scale-105'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-4xl mb-4">{game.icon}</div>
              <h3 className="font-bold text-xl mb-2">{game.name}</h3>
              <p className="text-sm opacity-90">{game.description}</p>
              {activeGame === game.id && (
                <div className="absolute top-2 right-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Active Game Display */}
        <AnimatePresence>
          {activeGame === 'pacman' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center"
            >
              <PacmanGame />
            </motion.div>
          )}
          {activeGame === 'dice' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center"
            >
              <DiceRoller />
            </motion.div>
          )}
          {activeGame === 'colors' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center"
            >
              <ColorGenerator />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PlaygroundSection;
