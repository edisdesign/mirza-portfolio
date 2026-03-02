import { Outlet, useLocation } from "react-router";
import { motion } from "motion/react";
import { Navbar } from "./Navbar";
import { ChalkCursor } from "./ChalkCursor";
import { ScrollToTop } from "./ScrollToTop";
import { useScrollRestore } from "../hooks/useScrollRestore";

export function Layout() {
  useScrollRestore();
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#f5f0eb] overflow-x-hidden">
      <ChalkCursor />
      <Navbar />
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </motion.div>
      <ScrollToTop />
    </div>
  );
}