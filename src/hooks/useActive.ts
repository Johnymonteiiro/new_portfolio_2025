import { useState, useEffect, useRef, useCallback } from "react";

export function useActiveLink() {
  const [active, setActive] = useState<string>("");
  const sectionsRef = useRef<Set<HTMLElement>>(new Set());

  useEffect(() => {
    const options = { threshold: 0.5 }; 
    const observer = new IntersectionObserver((entries) => {
      const intersectingEntries = entries.filter(
        (entry) => entry.isIntersecting
      );

      if (intersectingEntries.length > 0) {
        intersectingEntries.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );

        const closestEntry =
          window.scrollY === 0
            ? intersectingEntries[0]
            : intersectingEntries[intersectingEntries.length - 1]; 

        const sectionId = closestEntry.target.getAttribute("id");
        if (sectionId) {
          setActive(sectionId);
        }
      }
    }, options);

    sectionsRef.current.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const refCallback = useCallback((element: HTMLElement | null) => {
    if (element && !sectionsRef.current.has(element)) {
      sectionsRef.current.add(element);
    }
  }, []);

  return [refCallback, active] as const;
}
