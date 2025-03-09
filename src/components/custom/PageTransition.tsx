import { motion } from "framer-motion";
import { useRouter } from "next/router";

const variants = {
  hidden: { opacity: 0, x: -20 },
  enter: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <motion.div
      key={router.asPath}
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
