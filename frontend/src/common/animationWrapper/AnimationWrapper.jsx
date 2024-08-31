import { AnimatePresence, motion } from "framer-motion";

function AnimationWrapper({
  children,
  intial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
  keyValue,
  className,
}) {
  return (
    <AnimatePresence>
      <motion.div
        key={keyValue}
        initial={intial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimationWrapper;
