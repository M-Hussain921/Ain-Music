import { useEffect } from "react";

export const useClickOutside = (ref, handler, active = true) => {
  useEffect(() => {
    if (!active) return;

    const listener = (e) => {
      const el = ref.current;
      if (!el) return;
      if (el.contains(e.target)) return;
      handler(e);
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler, active]);
};
