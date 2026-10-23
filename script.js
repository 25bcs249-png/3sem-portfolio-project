// Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// Light / dark theme toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.dataset.theme !== "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
});

// Project category filters
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("selected", item === button));
    projectCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

// Expand / collapse project learning notes
document.querySelectorAll(".details-button").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".project-body");
    const extra = card.querySelector(".project-extra");
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    extra.hidden = isExpanded;
    button.setAttribute("aria-expanded", String(!isExpanded));
    button.innerHTML = isExpanded
      ? 'Show learning notes <span aria-hidden="true">＋</span>'
      : 'Hide learning notes <span aria-hidden="true">−</span>';
  });
});

// Contact form validation demo: this does not send email.
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

contactForm.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => field.removeAttribute("aria-invalid"));
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("visitorName");
  const email = document.getElementById("visitorEmail");
  const message = document.getElementById("visitorMessage");
  const fields = [name, email, message];
  let firstInvalid = null;

  fields.forEach((field) => {
    const invalid = !field.checkValidity();
    field.setAttribute("aria-invalid", String(invalid));
    if (invalid && !firstInvalid) firstInvalid = field;
  });

  if (firstInvalid) {
    formFeedback.textContent = "Please check the highlighted fields and complete them correctly.";
    formFeedback.className = "form-feedback error";
    firstInvalid.focus();
    return;
  }

  formFeedback.textContent = `Thanks, ${name.value.trim()}! The form has been validated, but no email was sent.`;
  formFeedback.className = "form-feedback success";
  contactForm.reset();
  fields.forEach((field) => field.removeAttribute("aria-invalid"));
});

// Footer year
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Highlight navigation link for the section currently in view
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => observer.observe(section));
}
