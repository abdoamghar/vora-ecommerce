import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { pageSpring } from "../motion/variants.js";
import AppNavbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const t = pageSpring(reduceMotion);

  return (
    <>
      <AppNavbar />
      <main className="vora-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={t}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
