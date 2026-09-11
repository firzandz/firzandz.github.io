/* Reusable progressive enhancements. The page remains readable without JS. */
(() => {
  if (window.feather) {
    window.feather.replace();
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
