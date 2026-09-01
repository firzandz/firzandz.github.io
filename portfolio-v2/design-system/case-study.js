// Shared case-study navigation, progressive disclosure, and anchor behavior.
const sectionNavigation = document.querySelector("#section-navigation");
    const caseDetails = document.querySelector(".case-details");
    const summaryHeadings = [...document.querySelectorAll(".summary-section[id] > h2")];
    const storyHeadings = [...document.querySelectorAll(".story-section[id] > h2")];
    const allSectionHeadings = [...summaryHeadings, ...storyHeadings];

    const createNavigationItem = (heading, isStorySection = false) => {
      const section = heading.parentElement;
      const item = document.createElement("li");
      const link = document.createElement("a");

      if (isStorySection) item.className = "detail-link story-nav-link";
      link.href = `#${section.id}`;
      link.textContent = heading.textContent;
      item.append(link);
      return item;
    };

    const storyPreviewItem = document.createElement("li");
    const storyPreviewLink = document.createElement("a");
    storyPreviewItem.className = "story-preview-link";
    storyPreviewLink.href = "#read-full";
    storyPreviewLink.textContent = "Full story";
    storyPreviewItem.append(storyPreviewLink);

    sectionNavigation.replaceChildren(
      ...summaryHeadings.map((heading) => createNavigationItem(heading)),
      storyPreviewItem,
      ...storyHeadings.map((heading) => createNavigationItem(heading, true))
    );

    const updateCurrentSection = () => {
      const availableHeadings = caseDetails.open ? allSectionHeadings : summaryHeadings;
      const readingLine = window.scrollY + 160;
      let currentSection;

      availableHeadings.forEach((heading) => {
        const section = heading.parentElement;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        if (sectionTop <= readingLine) currentSection = section;
      });

      sectionNavigation.querySelectorAll("a").forEach((link) => {
        if (link.hash === `#${currentSection?.id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    updateCurrentSection();
    window.addEventListener("scroll", updateCurrentSection, { passive: true });
    caseDetails.addEventListener("toggle", updateCurrentSection);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    document.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;

      const target = document.querySelector(link.hash);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion.matches ? "auto" : "smooth",
        block: "start"
      });
      history.pushState(null, "", link.hash);
    });
