import { useEffect, useRef } from "react";

type EventType = MouseEvent | TouchEvent | KeyboardEvent;

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  callback: (event: EventType) => void,
  nodesToIgnore?: React.RefObject<HTMLElement>[]
) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const listener = (event: EventType) => {
      const el = ref.current;
      const target = event.target as Node;
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      if (nodesToIgnore) {
        const isIgnored = nodesToIgnore.some(
          (ignoreRef) => ignoreRef.current && ignoreRef.current.contains(target)
        );
        if (isIgnored) return;
      }

      savedCallback.current(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, nodesToIgnore]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callback(event);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);
}
