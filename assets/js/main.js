/* Shiori Theme — Main JavaScript */
(function () {
  "use strict";

  /* ── Dark Mode ────────────────────────────────── */
  const html = document.documentElement;
  const THEME_KEY = "shiori-theme";

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    const sunIcon  = btn.querySelector(".icon-sun");
    const moonIcon = btn.querySelector(".icon-moon");
    if (theme === "dark") {
      if (sunIcon)  sunIcon.style.display  = "block";
      if (moonIcon) moonIcon.style.display = "none";
    } else {
      if (sunIcon)  sunIcon.style.display  = "none";
      if (moonIcon) moonIcon.style.display = "block";
    }
  }

  // Apply saved or system preference on page load (no flash)
  const stored = getStoredTheme();
  if (stored) {
    applyTheme(stored);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }

  document.addEventListener("DOMContentLoaded", function () {

    /* ── Theme Toggle ──────────────────────────── */
    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        const current = html.getAttribute("data-theme") || "light";
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        localStorage.setItem(THEME_KEY, next);
      });
    }

    /* ── Mobile Sidebar ───────────────────────── */
    const hamburger = document.getElementById("hamburger");
    const sidebar   = document.querySelector(".site-sidebar");
    const overlay   = document.querySelector(".sidebar-overlay");

    function openSidebar() {
      sidebar && sidebar.classList.add("open");
      overlay && overlay.classList.add("visible");
      document.body.style.overflow = "hidden";
    }
    function closeSidebar() {
      sidebar && sidebar.classList.remove("open");
      overlay && overlay.classList.remove("visible");
      document.body.style.overflow = "";
    }

    if (hamburger) hamburger.addEventListener("click", openSidebar);
    if (overlay)   overlay.addEventListener("click", closeSidebar);

    // Close sidebar on nav link click (mobile)
    if (sidebar) {
      sidebar.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          if (window.innerWidth <= 768) closeSidebar();
        });
      });
    }

    /* ── Code Copy Buttons ────────────────────── */
    const copyIcon = `<svg viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"/><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg>`;
    const checkIcon = `<svg viewBox="0 0 16 16"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/></svg>`;

    document.querySelectorAll("pre").forEach(function (pre) {
      // Skip if already has a copy button
      if (pre.querySelector(".copy-btn")) return;

      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.setAttribute("aria-label", "Copy code");
      btn.innerHTML = copyIcon + " Copy";
      btn.style.position = "absolute";
      btn.style.top      = "12px";
      btn.style.right    = "12px";

      // Make pre relative if not already
      pre.style.position = "relative";

      btn.addEventListener("click", function () {
        const code = pre.querySelector("code");
        const text = code ? code.innerText : pre.innerText;
        navigator.clipboard.writeText(text).then(function () {
          btn.innerHTML = checkIcon + " Copied!";
          btn.classList.add("copied");
          setTimeout(function () {
            btn.innerHTML = copyIcon + " Copy";
            btn.classList.remove("copied");
          }, 2000);
        }).catch(function () {
          // Fallback
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity  = "0";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
          btn.innerHTML = checkIcon + " Copied!";
          btn.classList.add("copied");
          setTimeout(function () {
            btn.innerHTML = copyIcon + " Copy";
            btn.classList.remove("copied");
          }, 2000);
        });
      });

      pre.appendChild(btn);
    });

    /* ── Code Tabs (shortcode) ─────────────────── */
    document.querySelectorAll(".code-tabs").forEach(function (tabs) {
      const nav    = tabs.querySelector(".code-tabs-nav");
      const panels = tabs.querySelectorAll(".code-tab-panel");
      if (!nav || !panels.length) return;

      // Mark container as JS-ready (enables tab hiding via CSS)
      tabs.classList.add("js-ready");

      // Dynamically build tab buttons from data-tab attribute
      panels.forEach(function (panel, i) {
        const name = panel.getAttribute("data-tab") || ("Tab " + (i + 1));
        const btn = document.createElement("button");
        btn.className = "code-tab-btn";
        btn.type = "button";
        btn.textContent = name;
        nav.appendChild(btn);

        btn.addEventListener("click", function () {
          nav.querySelectorAll(".code-tab-btn").forEach(function (b) { b.classList.remove("active"); });
          panels.forEach(function (p) { p.classList.remove("active"); });
          btn.classList.add("active");
          panel.classList.add("active");
        });
      });

      // Activate first tab by default
      const firstBtn = nav.querySelector(".code-tab-btn");
      if (firstBtn)  firstBtn.classList.add("active");
      if (panels[0]) panels[0].classList.add("active");
    });

    /* ── API Examples Tabs ─────────────────────── */
    document.querySelectorAll(".code-examples").forEach(function (container) {
      const nav    = container.querySelector(".code-tabs-nav");
      const btns   = nav ? nav.querySelectorAll(".code-tab-btn") : [];
      const panels = container.querySelectorAll(".code-tab-panel");
      btns.forEach(function (btn, i) {
        btn.addEventListener("click", function () {
          btns.forEach(function (b)   { b.classList.remove("active"); });
          panels.forEach(function (p) { p.classList.remove("active"); });
          btn.classList.add("active");
          if (panels[i]) panels[i].classList.add("active");
        });
      });
      if (btns[0])   btns[0].classList.add("active");
      if (panels[0]) panels[0].classList.add("active");
    });

    /* ── TOC Active Tracking ───────────────────── */
    const tocLinks = document.querySelectorAll("#TableOfContents a");
    if (tocLinks.length > 0) {
      const headings = Array.from(
        document.querySelectorAll(".prose h1, .prose h2, .prose h3, .prose h4, .api-section-title")
      ).filter(function (h) { return h.id; });

      function updateActiveTOC() {
        const scrollY = window.scrollY + 80;
        let activeId = "";
        headings.forEach(function (h) {
          if (h.offsetTop <= scrollY) activeId = h.id;
        });
        tocLinks.forEach(function (a) {
          a.classList.toggle(
            "active",
            a.getAttribute("href") === "#" + activeId
          );
        });
      }

      window.addEventListener("scroll", updateActiveTOC, { passive: true });
      updateActiveTOC();
    }

    /* ── Search ────────────────────────────────── */
    let searchIndex = null;

    async function loadSearchIndex() {
      if (searchIndex) return searchIndex;
      try {
        const base = document.querySelector("meta[name='base-url']");
        const baseURL = base ? base.content.replace(/\/$/, "") : "";
        const res = await fetch(baseURL + "/index.json");
        if (!res.ok) return null;
        searchIndex = await res.json();
        return searchIndex;
      } catch (e) {
        return null;
      }
    }

    function normalise(str) {
      return (str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function searchPages(query, index) {
      if (!query || !index) return [];
      const q = normalise(query);
      return index.filter(function (item) {
        return (
          normalise(item.title).includes(q) ||
          normalise(item.summary).includes(q) ||
          normalise(item.content).includes(q) ||
          normalise(item.section).includes(q)
        );
      }).slice(0, 10);
    }

    function renderResults(results, container) {
      container.innerHTML = "";
      if (!results || results.length === 0) {
        const empty = document.createElement("div");
        empty.className = "search-no-results";
        empty.textContent = "No results found.";
        container.appendChild(empty);
        container.classList.add("visible");
        return;
      }
      results.forEach(function (r) {
        const a = document.createElement("a");
        a.className = "search-result-item";
        a.href = r.permalink || "#";

        const title = document.createElement("div");
        title.className = "search-result-title";
        title.textContent = r.title || "";

        const section = document.createElement("div");
        section.className = "search-result-section";
        section.textContent = r.section || "";

        const summary = document.createElement("div");
        summary.className = "search-result-summary";
        summary.textContent = r.summary || "";

        a.appendChild(title);
        a.appendChild(section);
        if (r.summary) a.appendChild(summary);
        container.appendChild(a);
      });
      container.classList.add("visible");
    }

    function initSearch(inputEl, resultsEl) {
      if (!inputEl || !resultsEl) return;
      let timeout;

      inputEl.addEventListener("focus", function () {
        loadSearchIndex();
      });

      inputEl.addEventListener("input", function () {
        clearTimeout(timeout);
        const q = inputEl.value.trim();
        if (q.length < 2) {
          resultsEl.classList.remove("visible");
          return;
        }
        timeout = setTimeout(async function () {
          const index = await loadSearchIndex();
          const results = searchPages(q, index);
          renderResults(results, resultsEl);
        }, 180);
      });

      document.addEventListener("click", function (e) {
        if (!inputEl.contains(e.target) && !resultsEl.contains(e.target)) {
          resultsEl.classList.remove("visible");
        }
      });

      inputEl.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          resultsEl.classList.remove("visible");
          inputEl.blur();
        }
      });
    }

    // Header search
    initSearch(
      document.getElementById("header-search-input"),
      document.getElementById("header-search-results")
    );

    // Sidebar search
    initSearch(
      document.getElementById("sidebar-search-input"),
      document.getElementById("sidebar-search-results")
    );

    /* ── Active Sidebar Link ─────────────────── */
    const currentPath = window.location.pathname;
    document.querySelectorAll(".sidebar-nav-item a").forEach(function (a) {
      const href = a.getAttribute("href");
      if (href && href !== "/" && currentPath.startsWith(href)) {
        a.closest(".sidebar-nav-item").classList.add("active");
      } else if (href === currentPath) {
        a.closest(".sidebar-nav-item").classList.add("active");
      }
    });

  }); // end DOMContentLoaded

})();
