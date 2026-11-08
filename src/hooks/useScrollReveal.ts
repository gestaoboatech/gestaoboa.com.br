import { useEffect } from "react";

/**
 * Anima elementos quando eles surgem na tela (scroll reveal).
 * Usa as propriedades `opacity` e `translate` (independentes de `transform`)
 * para não conflitar com animações/transforms já existentes nos componentes.
 *
 * Também observa mudanças no DOM para animar conteúdo que aparece depois
 * (páginas lazy-loaded, renderização condicional etc.).
 *
 * @param routeKey valor que, ao mudar (ex.: pathname), reinicia a varredura
 */
export function useScrollReveal(routeKey: string = "", rootSelector = "section") {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const SKIP = ".reveal, .scroll-reveal, .reveal-element, [data-no-reveal]";
    const SKIP_TAGS = ["SCRIPT", "STYLE", "SVG", "BR", "IMG_PLACEHOLDER"];
    const tracked = new Set<HTMLElement>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("reveal-visible");
          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const register = (el: HTMLElement) => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      const index = Math.max(0, siblings.indexOf(el));
      el.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 90}ms`);
      el.classList.add("reveal");
      tracked.add(el);
      observer.observe(el);
    };

    const collect = (el: HTMLElement, depth: number, out: HTMLElement[]) => {
      Array.from(el.children).forEach((child) => {
        if (!(child instanceof HTMLElement)) return;
        if (SKIP_TAGS.includes(child.tagName.toUpperCase())) return;
        if (child.matches(SKIP) || child.closest(".scroll-reveal, .reveal-element")) return;
        const position = getComputedStyle(child).position;
        if (position === "fixed" || position === "absolute" || position === "sticky") return;
        out.push(child);
        if (depth < 1 && child.children.length > 1) collect(child, depth + 1, out);
      });
    };

    const scan = () => {
      const targets: HTMLElement[] = [];
      document.querySelectorAll<HTMLElement>(rootSelector).forEach((section) => {
        let base: HTMLElement = section;
        while (base.children.length === 1 && base.children[0] instanceof HTMLElement) {
          base = base.children[0] as HTMLElement;
        }
        collect(base, 0, targets);
      });
      targets.forEach(register);
    };

    scan();

    let timer: number | undefined;
    const mutations = new MutationObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(scan, 120);
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(timer);
      mutations.disconnect();
      observer.disconnect();
      tracked.forEach((el) => {
        el.classList.remove("reveal", "reveal-visible");
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, [routeKey, rootSelector]);
}
