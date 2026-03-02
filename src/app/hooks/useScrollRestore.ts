import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

const scrollPositions: Record<string, number> = {};

/**
 * Saves scroll position when leaving a page and restores it when coming back.
 * Detail pages (radovi/:id) always scroll to top.
 * List/home pages restore their previous scroll position.
 */
export function useScrollRestore() {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  // Save scroll position on every scroll
  useEffect(() => {
    const handleScroll = () => {
      scrollPositions[pathname] = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      // Save final position when unmounting
      scrollPositions[pathname] = window.scrollY;
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // Restore or reset scroll on navigation
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;

      const isDetailPage =
        /^\/radovi\/\d+$/.test(pathname) ||
        pathname === "/impresum" ||
        pathname === "/politika-privatnosti";

      if (isDetailPage) {
        // Detail pages always start at top
        window.scrollTo(0, 0);
      } else {
        // List/home pages restore saved position
        const saved = scrollPositions[pathname];
        if (saved !== undefined) {
          // Use multiple attempts to ensure DOM is fully rendered
          const restoreScroll = (attempts: number) => {
            if (attempts <= 0) return;
            requestAnimationFrame(() => {
              window.scrollTo(0, saved);
              // If we haven't reached the target, try again
              if (Math.abs(window.scrollY - saved) > 10 && attempts > 1) {
                restoreScroll(attempts - 1);
              }
            });
          };
          restoreScroll(5);
        } else {
          window.scrollTo(0, 0);
        }
      }
    }
  }, [pathname]);
}