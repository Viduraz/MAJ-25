import React from "react";
import { motion } from "framer-motion";

const AnimationContainer = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{
        opacity: 1,
        transition: {
          duration: 2,
          type: "tween",
          ease: "backOut",
        },
        y: 0,
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default AnimationContainer;
