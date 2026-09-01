/* Reusable progressive enhancements. The page remains readable without JS. */
(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  function updateGreetings() {
    const now = new Date();
    const hour = now.getHours();
    const time = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    }).format(now).replace(" ", "").toLowerCase();
    const salutation = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

    greetings.forEach((greeting) => {
      greeting.textContent = `It's ${time}. ${salutation}.`;
    });
  }

  if (greetings.length) {
    updateGreetings();
    window.setInterval(updateGreetings, 30000);
  }
})();
