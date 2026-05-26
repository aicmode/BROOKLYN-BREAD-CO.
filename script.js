const header = document.querySelector(".site-header");
const nav = document.querySelector(".site-nav");
const navToggle = document.querySelector(".nav-toggle");
const transitionLayer = document.querySelector(".page-transition");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", Boolean(isOpen));
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  navToggle.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("is-open");
    navToggle?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

document.querySelectorAll('a[href$=".html"]').forEach((link) => {
  const url = new URL(link.href);
  const isSamePage = url.pathname === window.location.pathname;

  if (url.origin !== window.location.origin || isSamePage) return;

  link.addEventListener("click", (event) => {
    event.preventDefault();
    transitionLayer?.classList.add("is-active");
    window.setTimeout(() => {
      window.location.href = link.href;
    }, 270);
  });
});

window.addEventListener("pageshow", () => {
  transitionLayer?.classList.remove("is-active");
});
