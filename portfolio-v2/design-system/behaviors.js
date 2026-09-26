/* Reusable progressive enhancements. The page remains readable without JS. */
(() => {
  if (window.feather) {
    window.feather.replace();
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const themeOptions = Array.from(document.querySelectorAll("[name=theme]"));
  const themeToggle = document.querySelector(".theme-toggle-input");
  const colorScheme = window.matchMedia("(prefers-color-scheme: light)");

  function readSavedTheme() {
    try {
      const savedTheme = window.localStorage.getItem("portfolio-theme");
      return ["system", "light", "dark"].includes(savedTheme) ? savedTheme : "system";
    } catch {
      return "system";
    }
  }

  function setTheme(theme, save = false) {
    if (save) {
      const transitionBlocker = document.createElement("style");
      transitionBlocker.textContent = "*,*::before,*::after{transition:none!important}";
      document.head.append(transitionBlocker);
      void document.documentElement.offsetWidth;
      window.requestAnimationFrame(() => transitionBlocker.remove());
    }

    document.body.dataset.theme = theme;
    themeOptions.forEach((option) => {
      option.checked = option.value === theme;
    });

    if (themeToggle) {
      const isLight = theme === "light" || (theme === "system" && colorScheme.matches);
      themeToggle.checked = isLight;
      themeToggle.setAttribute("aria-label", isLight ? "Use dark mode" : "Use light mode");
    }

    if (save) {
      try {
        window.localStorage.setItem("portfolio-theme", theme);
      } catch {
        // The chosen theme still applies for this visit if storage is unavailable.
      }
    }
  }

  if (themeOptions.length || themeToggle) {
    setTheme(readSavedTheme());
  }

  if (themeOptions.length) {
    themeOptions.forEach((option) => {
      option.addEventListener("change", () => setTheme(option.value, true));
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      setTheme(themeToggle.checked ? "light" : "dark", true);
    });

    colorScheme.addEventListener("change", () => {
      if (readSavedTheme() === "system") setTheme("system");
    });
  }

  document.addEventListener("click", (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return;

    const link = event.target.closest?.("a[href]");
    if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

    const destination = new URL(link.href, window.location.href);
    const isSamePage =
      destination.origin === window.location.origin &&
      destination.pathname === window.location.pathname &&
      destination.search === window.location.search;

    if (!isSamePage || !destination.hash || destination.hash === "#") return;

    let targetId;
    try {
      targetId = decodeURIComponent(destination.hash.slice(1));
    } catch {
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start"
    });

    if (window.location.hash !== destination.hash) {
      window.history.pushState(null, "", destination.hash);
    }
  });

  document.querySelectorAll("[data-typing-text]").forEach((headline) => {
    const text = headline.dataset.typingText || headline.textContent;
    const caret = headline.parentElement?.querySelector(".typing-caret");

    if (reducedMotion) {
      headline.textContent = text;
      return;
    }

    headline.textContent = "";
    let index = 0;

    function type() {
      if (index < text.length) {
        headline.append(text.charAt(index));
        index += 1;
        window.setTimeout(type, 80);
      } else {
        caret?.classList.add("typing-caret--blink");
      }
    }

    window.setTimeout(type, 600);
  });

  document.querySelectorAll("[data-testimonials]").forEach((testimonialStage) => {
    const slides = Array.from(testimonialStage.querySelectorAll("[data-testimonial]"));
    const status = testimonialStage.querySelector("[data-testimonial-status]");
    const steps = Array.from(testimonialStage.querySelectorAll("[data-testimonial-step]"));
    const rotationDelay = 6500;
    let activeIndex = 0;
    let rotationTimer;

    if (!slides.length || steps.length !== slides.length) return;

    function renderTestimonial(announce = false, animate = false) {
      slides.forEach((slide, index) => {
        slide.hidden = index !== activeIndex;
        slide.classList.remove("testimonial-slide--enter");
      });

      steps.forEach((step, index) => {
        step.setAttribute("aria-current", String(index === activeIndex));
      });

      if (animate && !reducedMotion) {
        const activeSlide = slides[activeIndex];
        // Restart the entrance animation after the previous slide has left the flow.
        void activeSlide.offsetWidth;
        activeSlide.classList.add("testimonial-slide--enter");
      }

      if (announce && status) {
        const person = slides[activeIndex].querySelector(".testimonial-name")?.textContent;
        status.textContent = `Showing testimonial ${activeIndex + 1} of ${slides.length}${person ? `, from ${person}` : ""}.`;
      }
    }

    function stopRotation() {
      window.clearTimeout(rotationTimer);
    }

    function startRotation() {
      stopRotation();
      if (reducedMotion || document.hidden) return;

      rotationTimer = window.setTimeout(() => {
        activeIndex = (activeIndex + 1) % slides.length;
        renderTestimonial(false, true);
        startRotation();
      }, rotationDelay);
    }

    steps.forEach((step, index) => {
      step.addEventListener("click", () => {
        if (activeIndex !== index) {
          activeIndex = index;
          renderTestimonial(true, true);
        }
        startRotation();
      });
    });

    testimonialStage.addEventListener("mouseenter", stopRotation);
    testimonialStage.addEventListener("mouseleave", startRotation);
    testimonialStage.addEventListener("focusin", stopRotation);
    testimonialStage.addEventListener("focusout", () => {
      window.setTimeout(() => {
        if (!testimonialStage.matches(":focus-within")) startRotation();
      });
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopRotation();
      else startRotation();
    });

    testimonialStage.dataset.testimonialsReady = "";
    renderTestimonial();
    startRotation();
  });

  const greetings = document.querySelectorAll("[data-local-greeting]");
  const greetingIcons = document.querySelectorAll("[data-local-greeting-icon]");

  function updateGreetings() {
    const now = new Date();
    const hour = now.getHours();
    const time = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    }).format(now).replace(" ", "").toLowerCase();
    const salutation = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    const isDaytime = hour >= 6 && hour < 17;
    const iconName = isDaytime ? "sun" : "moon";

    greetings.forEach((greeting) => {
      greeting.textContent = `It's ${time}. ${salutation}.`;
    });

    greetingIcons.forEach((icon) => {
      if (icon.dataset.period === iconName) return;

      icon.dataset.period = iconName;
      const featherIcon = window.feather?.icons?.[iconName];

      if (featherIcon) {
        icon.innerHTML = featherIcon.toSvg({
          width: 14,
          height: 14,
          "stroke-width": 1.75,
          "aria-hidden": "true",
          focusable: "false"
        });
      } else {
        icon.textContent = isDaytime ? "☀" : "☾";
      }
    });
  }

  if (greetings.length) {
    updateGreetings();
    window.setInterval(updateGreetings, 30000);
  }
})();
