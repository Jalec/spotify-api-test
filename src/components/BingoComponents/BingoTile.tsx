import React from "react";
import { motion } from "framer-motion";

interface BingoTileProps {
  song: string;
  artists: string;
  marked: boolean;
  onClick: () => void;
}

const springAnimation = {
  type: "spring",
  stiffness: 400,
  damping: 20,
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,

    transition: springAnimation,
  },
};

export const BingoTile: React.FC<BingoTileProps> = ({
  song,
  artists,
  marked,
  onClick,
}) => (
  <motion.li
    variants={itemVariants}
    className={`
          border rounded-xl
          flex justify-center items-center
          w-32 h-32 p-4
          text-center text-sm font-medium
          transition-colors duration-200
          ${
            marked
              ? "bg-green-500 text-white border-green-500 cursor-pointer"
              : "hover:bg-gray-50 border-gray-200 cursor-pointer"
          }
        `}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={springAnimation}
    onClick={onClick}
  >
    {song} - {artists}
  </motion.li>
);
