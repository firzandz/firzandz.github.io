/* BRIdex case-study interactions. */
(() => {
  document.querySelectorAll(".migration-callout, .foundation-spec, .migration-audit__library-picker button").forEach((chip) => {
    chip.classList.add("audit-chip");
  });

  // Measure the real chip and target edges, including while the layout animates.
  function connectAudit(container, getConnections) {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.classList.add("audit-connectors");
    svg.setAttribute("aria-hidden", "true");
    container.append(svg);
    let frame = 0;
    let until = 0;
    function draw() {
      const bounds = container.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
      const connections = getConnections();
      while (svg.children.length > connections.length) svg.lastChild.remove();
      connections.forEach(({chip, target}, index) => {
        const from = chip.getBoundingClientRect();
        const to = target.getBoundingClientRect();
        const left = from.right <= to.left;
        const x1 = (left ? from.right : from.left) - bounds.left;
        const y1 = from.top + from.height / 2 - bounds.top;
        const x2 = (left ? to.left : to.right) - bounds.left;
        const y2 = to.top + to.height / 2 - bounds.top;
        const middle = x1 + (x2 - x1) * 0.5;
        let path = svg.children[index];
        if (!path) { path = document.createElementNS(ns, "path"); svg.append(path); }
        path.setAttribute("d", `M${x1},${y1} H${middle} V${y2} H${x2}`);
      });
      frame = performance.now() < until ? requestAnimationFrame(draw) : 0;
    }
    function update() {
      until = performance.now() + 350;
      if (!frame) frame = requestAnimationFrame(draw);
    }
    new ResizeObserver(update).observe(container);
    window.addEventListener("resize", update);
    document.fonts?.ready.then(update);
    return update;
  }

  document.querySelectorAll("[data-migration-audit]").forEach((audit) => {
    const revealButton = audit.querySelector("[data-audit-reveal]");
    const controls = audit.querySelector(".migration-audit__controls");
    const status = audit.querySelector("[data-audit-status]");
    const libraryButtons = Array.from(audit.querySelectorAll("[data-library-filter]"));
    const callouts = Array.from(audit.querySelectorAll(".migration-callout"));
    const redlines = Array.from(audit.querySelectorAll(".migration-redline"));

    if (!revealButton || !controls || !status || !libraryButtons.length) return;

    let activeLibrary = "bridex";
    let activeComponent = "";
    const updateConnectors = connectAudit(audit.querySelector(".migration-audit__stage"), () =>
      callouts.filter((chip) => chip.dataset.visible === "true")
        .map((chip) => ({chip, target: redlines.find((line) => line.dataset.component === chip.dataset.component && line.dataset.visible === "true")}))
        .filter(({target}) => target)
    );

    [...callouts, ...redlines].forEach((item) => {
      item.hidden = false;
      item.dataset.visible = "false";
    });

    function libraryName(library) {
      return library === "bridex" ? "BRIDex" : "BRImo";
    }

    function render() {
      const isRevealed = audit.dataset.revealed === "true";
      const visibleCallouts = callouts.filter((callout) => callout.dataset.libraryItem === activeLibrary);

      audit.dataset.library = activeLibrary;
      audit.toggleAttribute("data-component-active", Boolean(activeComponent));

      libraryButtons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.libraryFilter === activeLibrary));
      });

      callouts.forEach((callout) => {
        const isVisible = isRevealed && callout.dataset.libraryItem === activeLibrary;
        const isActive = callout.dataset.component === activeComponent;
        callout.dataset.visible = String(isVisible);
        callout.setAttribute("aria-hidden", String(!isVisible));
        callout.tabIndex = isVisible ? 0 : -1;
        callout.setAttribute("aria-pressed", String(isActive));
      });

      redlines.forEach((redline) => {
        const matchesLibrary = redline.dataset.libraryItem === activeLibrary;
        const matchesComponent = !activeComponent || redline.dataset.component === activeComponent;
        redline.dataset.visible = String(isRevealed && matchesLibrary && matchesComponent);
      });

      const selectedCallout = visibleCallouts.find((callout) => callout.dataset.component === activeComponent);
      status.textContent = selectedCallout
        ? `${selectedCallout.textContent.trim()} from ${libraryName(activeLibrary)} is isolated. Select it again to show all components.`
        : `Showing ${visibleCallouts.length} ${libraryName(activeLibrary)} components. Select a component name to isolate its redline.`;
      updateConnectors();
    }

    revealButton.addEventListener("click", () => {
      revealButton.setAttribute("aria-expanded", "true");
      revealButton.hidden = true;
      controls.hidden = false;
      void controls.offsetWidth;
      audit.dataset.revealed = "true";
      render();
      libraryButtons[0].focus({ preventScroll: true });
    });

    libraryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeLibrary = button.dataset.libraryFilter;
        activeComponent = "";
        render();
      });
    });

    callouts.forEach((callout) => {
      callout.addEventListener("click", () => {
        activeComponent = activeComponent === callout.dataset.component ? "" : callout.dataset.component;
        render();
      });
    });

    audit.dataset.migrationAuditReady = "";
    render();
  });

  document.querySelectorAll("[data-foundation-audit]").forEach((audit) => {
    const revealButton = audit.querySelector("[data-foundation-reveal]");
    const controls = audit.querySelector("#input-amount-foundation-controls");
    const status = audit.querySelector("[data-foundation-status]");
    const callouts = Array.from(audit.querySelectorAll("[data-foundation-filter]"));
    const redlines = Array.from(audit.querySelectorAll("[data-foundation-item]"));
    const details = audit.querySelector(".foundation-audit__specs");
    const detailPanels = Array.from(audit.querySelectorAll("[data-foundation-detail]"));
    const specs = Array.from(audit.querySelectorAll("[data-spec-lines]"));

    if (!revealButton || !controls || !status || !callouts.length || !redlines.length || !details || !detailPanels.length) return;

    let activeFoundation = "typography";
    let activeSpec = null;
    audit.querySelector(".foundation-audit__connectors")?.remove();
    const updateConnectors = connectAudit(audit.querySelector(".foundation-audit__workspace"), () => {
      if (audit.dataset.revealed !== "true") return [];
      const panel = detailPanels.find((item) => item.dataset.foundationDetail === activeFoundation);
      const lines = redlines.filter((line) => line.dataset.foundationItem === activeFoundation);
      return Array.from(panel.querySelectorAll("[data-spec-lines]"))
        .filter((chip) => !activeSpec || chip === activeSpec)
        .flatMap((chip) => {
          const indices = chip.dataset.specLines.split(" ");
          // One pointer for the amount group; each amount retains its redline.
          const targets = indices.length === 3 ? indices.slice(0, 1) : indices;
          return targets.map((index) => ({chip, target: lines[Number(index)]}));
        });
    });

    [...callouts, ...redlines].forEach((item) => {
      item.hidden = false;
      item.dataset.visible = "false";
    });

    function foundationName(foundation) {
      return foundation === "typography" ? "Typography" : "Colors";
    }

    function render() {
      const isRevealed = audit.dataset.revealed === "true";

      if (isRevealed && activeFoundation) {
        audit.dataset.foundationActive = activeFoundation;
      } else {
        delete audit.dataset.foundationActive;
      }

      callouts.forEach((callout) => {
        const isActive = callout.dataset.foundationFilter === activeFoundation;
        callout.dataset.visible = String(isRevealed);
        callout.setAttribute("aria-hidden", String(!isRevealed));
        callout.tabIndex = isRevealed ? 0 : -1;
        callout.setAttribute("aria-pressed", String(isActive));
      });

      redlines.forEach((redline) => {
        const matchesFoundation = activeFoundation && redline.dataset.foundationItem === activeFoundation;
        const index = redlines.filter((item) => item.dataset.foundationItem === activeFoundation).indexOf(redline);
        const matchesSpec = !activeSpec || activeSpec.dataset.specLines.split(" ").includes(String(index));
        redline.dataset.visible = String(isRevealed && Boolean(matchesFoundation) && matchesSpec);
      });

      specs.forEach((spec) => {
        spec.setAttribute("aria-pressed", String(spec === activeSpec));
        spec.dataset.dimmed = String(Boolean(activeSpec && spec !== activeSpec));
      });
      details.hidden = !isRevealed || !activeFoundation;
      detailPanels.forEach((panel) => {
        panel.hidden = !isRevealed || panel.dataset.foundationDetail !== activeFoundation;
      });

      status.textContent = !isRevealed
        ? ""
        : activeFoundation
          ? activeSpec
            ? `${activeSpec.getAttribute("aria-label")}. Select again to show all specifications.`
            : `Showing ${foundationName(activeFoundation)} redlines and foundation specifications.`
          : "Choose Typography or Colors to inspect its redlines and foundation styles.";
      updateConnectors();
    }

    revealButton.addEventListener("click", () => {
      revealButton.setAttribute("aria-expanded", "true");
      revealButton.hidden = true;
      controls.hidden = false;
      void controls.offsetWidth;
      audit.dataset.revealed = "true";
      render();
      callouts[0].focus({ preventScroll: true });
    });

    callouts.forEach((callout) => {
      callout.addEventListener("click", () => {
        const selectedFoundation = callout.dataset.foundationFilter;
        activeFoundation = selectedFoundation;
        activeSpec = null;
        render();
      });
    });

    specs.forEach((spec) => {
      spec.addEventListener("click", () => {
        activeSpec = activeSpec === spec ? null : spec;
        render();
      });
    });

    audit.dataset.foundationAuditReady = "";
    render();
  });
})();
