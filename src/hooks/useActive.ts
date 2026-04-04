import { useState, useEffect, useRef, useCallback } from "react";

export function useActiveLink(initialActive: string = "") {
  const [active, setActive] = useState<string>(initialActive);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionsRef = useRef<Set<HTMLElement>>(new Set());

  useEffect(() => {
    const options: IntersectionObserverInit = {
      rootMargin: "-10% 0px -85% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      const intersecting = entries.filter((e) => e.isIntersecting);

      if (intersecting.length === 0) return;

      intersecting.sort(
        (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
      );

      const sectionId = intersecting[0].target.getAttribute("id");
      if (sectionId) setActive(sectionId);
    }, options);

    observerRef.current = observer;
    sectionsRef.current.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, []);

  // Activate the last section when the user reaches the bottom of the page,
  // since it may never enter the IntersectionObserver detection zone.
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.scrollY + window.innerHeight >= document.body.scrollHeight - 80;

      if (!nearBottom) return;

      let lastEl: HTMLElement | null = null;
      sectionsRef.current.forEach((el) => {
        if (!lastEl || el.offsetTop > lastEl.offsetTop) {
          lastEl = el;
        }
      });

      if (lastEl) {
        const id = (lastEl as HTMLElement).id;
        if (id) setActive(id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const refCallback = useCallback((element: HTMLElement | null) => {
    if (!element || sectionsRef.current.has(element)) return;
    sectionsRef.current.add(element);
    observerRef.current?.observe(element);
  }, []);

  return [refCallback, active] as const;
}
