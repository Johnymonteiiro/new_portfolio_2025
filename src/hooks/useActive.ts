import { useState, useEffect, useRef, useCallback } from "react";

export function useActiveLink() {
  const [active, setActive] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionsRef = useRef<Set<HTMLElement>>(new Set());

  useEffect(() => {
    // rootMargin: "-10% top, 0 sides, -85% bottom" — fires when section
    // enters the top 15% of the viewport, which works for any section height.
    const options: IntersectionObserverInit = {
      rootMargin: "-10% 0px -85% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      const intersecting = entries.filter((e) => e.isIntersecting);

      if (intersecting.length === 0) return;

      // Pick the entry closest to the top of the viewport
      intersecting.sort(
        (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
      );

      const sectionId = intersecting[0].target.getAttribute("id");
      if (sectionId) setActive(sectionId);
    }, options);

    observerRef.current = observer;

    // Observe any elements already added before this effect ran
    sectionsRef.current.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, []);

  const refCallback = useCallback((element: HTMLElement | null) => {
    if (!element || sectionsRef.current.has(element)) return;
    sectionsRef.current.add(element);
    // Observe immediately if the observer is already running
    observerRef.current?.observe(element);
  }, []);

  return [refCallback, active] as const;
}
