import { motion } from 'framer-motion';

const TextAnimation = ({ text, fontClassname }) => {
  return (
    <div className="text-container">
      {text.split('').map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`text-white text-5xl sm:text-7xl font-extrabold ${fontClassname}`}>
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

export default TextAnimation;

