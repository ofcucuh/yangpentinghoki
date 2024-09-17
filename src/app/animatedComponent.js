import { motion } from 'framer-motion';

const AnimatedComponent = ({ element, children, delay }) => {
  const variants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: 1,
      delay: delay,
      ease: [0, 2, 0.7, 1.2]
    }
  };

  const Component = motion[element];

  return (
    <Component
      initial={variants.initial}
      animate={variants.animate}
      transition={variants.transition}
    >
      {children}
    </Component>
  );
};

export default AnimatedComponent;
