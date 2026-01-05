// كود لعرض/إخفاء المعلومات المخفية
document.addEventListener("DOMContentLoaded", function () {
  // Hamburger menu toggle
  const hamburger = document.getElementById("menu-toggle");
  const sideMenu = document.querySelector(".side-menu");

  if (hamburger && sideMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      sideMenu.classList.toggle("active");
    });

    // Close menu when clicking on a menu item
    document.querySelectorAll(".menu-item").forEach((item) => {
      item.addEventListener("click", function () {
        hamburger.classList.remove("active");
        sideMenu.classList.remove("active");
      });
    });

    // Close menu when clicking outside (left page)
    document.addEventListener("click", (e) => {
      if (!sideMenu.classList.contains("active")) return;
      const target = e.target;
      if (sideMenu.contains(target) || hamburger.contains(target)) return;
      hamburger.classList.remove("active");
      sideMenu.classList.remove("active");
    });
  }

  // YouTube Subscriber Counter
  const YOUTUBE_API_KEY = "AIzaSyBjMzgc1Wbp06WCQ4aVp-q84W1BM7Cr1QM";
  const CHANNEL_ID = "UC_Myh5uLQ53eyBGOrqkyjAw"; // Replace with your channel ID

  function fetchYouTubeSubscribers() {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const subscribers = data.items[0].statistics.subscriberCount;
          document.getElementById("subscriber-count").textContent =
            subscribers.toLocaleString();
        }
      })
      .catch((error) => {
        console.error("Error fetching subscribers:", error);
        document.getElementById("subscriber-count").textContent =
          "Error loading";
      });
  }

  fetchYouTubeSubscribers();

  // Restore last-open section from previous visit (if any)
  const savedSection = localStorage.getItem("activeSection");
  if (savedSection) {
    // Remove active class from all menu items and content sections first
    document.querySelectorAll(".menu-item").forEach((menuItem) => {
      menuItem.classList.remove("active");
    });
    document.querySelectorAll(".content-section").forEach((section) => {
      section.classList.remove("active");
    });

    // mark corresponding menu item active
    const savedMenuItem = document.querySelector(
      `.menu-item[data-target="${savedSection}"]`
    );
    if (savedMenuItem) savedMenuItem.classList.add("active");
    // show corresponding content section
    const savedSectionEl = document.getElementById(savedSection);
    if (savedSectionEl) savedSectionEl.classList.add("active");
  }

  // Handle navigation menu clicks
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");

      // Remove active class from all menu items and content sections
      document.querySelectorAll(".menu-item").forEach((menuItem) => {
        menuItem.classList.remove("active");
      });
      document.querySelectorAll(".content-section").forEach((section) => {
        section.classList.remove("active");
      });

      // Add active class to clicked menu item and corresponding content section
      this.classList.add("active");
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add("active");
      }
      // remember the selected section across reloads
      try {
        localStorage.setItem("activeSection", targetId);
      } catch (e) {
        // ignore storage errors (e.g., private mode)
      }
    });
  });

  // أضف حدث النقر لعناصر القائمة
  document.querySelectorAll(".expandable-item").forEach((item) => {
    item.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const hiddenInfo = document.getElementById(targetId);

      if (hiddenInfo) {
        // إغلاق جميع العناصر الأخرى مفتوحة
        document.querySelectorAll(".hidden-info.open").forEach((openItem) => {
          if (openItem.id !== targetId) {
            openItem.classList.remove("open");
            const correspondingItem = document.querySelector(
              `[data-target="${openItem.id}"]`
            );
            if (correspondingItem) {
              correspondingItem.classList.remove("open");
            }
          }
        });

        // تبديل العنصر الحالي
        this.classList.toggle("open");
        hiddenInfo.classList.toggle("open");

        // تشغيل صوت عند الفتح
        if (hiddenInfo.classList.contains("open")) {
          playCRTClickSound();
        }
      }
    });
  });

  // تشغيل صوت CRT عند النقر
  function playCRTClickSound() {
    try {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        400,
        audioContext.currentTime + 0.1
      );

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.1
      );

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      // تجاهل إذا لم يدعم المتصفح Web Audio API
    }
  }

  // Animate Memory Bar
  function animateMemoryBar() {
    const bar = document.getElementById("memory-fill");
    if (!bar) return; // element not present
    let width = 65;
    let direction = 1;
    bar.style.width = `${width}%`;

    setInterval(() => {
      width += direction;
      if (width > 75 || width < 55) {
        direction *= -1;
      }
      bar.style.width = `${width}%`;
    }, 500);
  }

  // Start animation when DOM is ready
  animateMemoryBar();

  // God of War Toggle Button Functionality
  document.querySelectorAll(".gow-toggle-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetId = this.getAttribute("data-toggle");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Toggle the visibility
        this.classList.toggle("active");
        targetElement.classList.toggle("revealed");

        // Play God of War sound effect on toggle
        playGOWClickSound();
      }
    });
  });

  // God of War themed sound effect
  function playGOWClickSound() {
    try {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = "sine";
      // Create a more dramatic "clash" sound
      oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        150,
        audioContext.currentTime + 0.2
      );

      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.2
      );

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      // تجاهل إذا لم يدعم المتصفح Web Audio API
    }
  }

  // السماح بفتح عنصر واحد فقط في كل مرة (اختياري)
  document.querySelectorAll(".hidden-info").forEach((info) => {
    info.addEventListener("click", function (e) {
      e.stopPropagation(); // منع الإغلاق عند النقر داخل المحتوى
    });
  });

  // Header terminal-style search integration
  const headerForm = document.getElementById("header-search-form");
  const headerInput = document.getElementById("header-search-input");
  if (headerForm && headerInput) {
    headerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const q = headerInput.value.trim();
      if (!q) return;
      performSearch(q);
      // keep focus and caret so the header behaves like a locked terminal
      try {
        headerInput.focus();
        const len = headerInput.value.length;
        headerInput.setSelectionRange(len, len);
      } catch (err) {
        // ignore if browser disallows selection range
      }
    });

    headerInput.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        headerInput.value = "";
      }
    });
    // mini-cursor that visually follows typed text
    const cursorMini = document.querySelector(".cursor-mini");
    // hidden measurement span
    let measureSpan = document.getElementById("header-measure-span");
    if (!measureSpan) {
      measureSpan = document.createElement("span");
      measureSpan.id = "header-measure-span";
      measureSpan.style.position = "absolute";
      measureSpan.style.left = "-9999px";
      measureSpan.style.top = "-9999px";
      measureSpan.style.visibility = "hidden";
      measureSpan.style.whiteSpace = "pre";
      document.body.appendChild(measureSpan);
    }

    function updateMiniCursor() {
      if (!cursorMini) return;
      const label = document.getElementById("search-prefix");
      const labelWidth = label ? label.offsetWidth : 0;
      // copy input text into measure span with same font
      const cs = window.getComputedStyle(headerInput);
      measureSpan.style.font = cs.font;
      measureSpan.style.fontFamily = cs.fontFamily;
      measureSpan.style.fontSize = cs.fontSize;
      measureSpan.textContent = headerInput.value || "";
      const textWidth = measureSpan.offsetWidth;
      // position cursor after label + typed text
      const offset = labelWidth + textWidth + 4; // small padding
      cursorMini.style.left = offset + "px";
    }

    headerInput.addEventListener("input", updateMiniCursor);
    // update on focus and window resize
    headerInput.addEventListener("focus", updateMiniCursor);
    window.addEventListener("resize", updateMiniCursor);
    // init
    setTimeout(updateMiniCursor, 50);
  }

  // Basic client-side search: scrolls to first match and briefly highlights it
  function performSearch(query) {
    const q = query.toLowerCase();
    const selectors =
      ".info-title, .info-content, .glitch-list li, .expandable-item, .hidden-info";
    const nodes = Array.from(document.querySelectorAll(selectors));
    const match = nodes.find(
      (n) => n.textContent && n.textContent.toLowerCase().includes(q)
    );
    if (match) {
      match.scrollIntoView({ behavior: "smooth", block: "center" });
      match.classList.add("highlight-search");
      setTimeout(() => match.classList.remove("highlight-search"), 2200);
      // If the match is inside a hidden-info, open its parent expandable item
      const hidden = match.closest(".hidden-info");
      if (hidden && !hidden.classList.contains("open")) {
        hidden.classList.add("open");
        const corresponding = document.querySelector(
          `[data-target="${hidden.id}"]`
        );
        if (corresponding) corresponding.classList.add("open");
      }
    } else {
      // brief feedback on no results
      const footer = document.querySelector(".terminal-footer p");
      if (footer) {
        const orig = footer.style.color || "";
        footer.style.color = "#ff5555";
        setTimeout(() => (footer.style.color = orig), 900);
      }
    }
  }
});
