// Shared case-study navigation and progressive disclosure.
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

    if (!sectionNavigation.hasAttribute("data-preserve-links")) sectionNavigation.replaceChildren(
      ...summaryHeadings.map((heading) => createNavigationItem(heading)),
      storyPreviewItem,
      ...storyHeadings.map((heading) => createNavigationItem(heading, true))
    );

    sectionNavigation.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      const target = link && document.getElementById(link.hash.slice(1));
      if (target && caseDetails.contains(target)) caseDetails.open = true;
    });

    const updateCurrentSection = () => {
      const availableHeadings = caseDetails.open ? allSectionHeadings : summaryHeadings;
      const readingLine = window.scrollY + 160;
      let currentSection;

      availableHeadings.forEach((heading) => {
        const section = heading.parentElement;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        if (sectionTop <= readingLine && sectionNavigation.querySelector(`a[href="#${section.id}"]`)) currentSection = section;
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
