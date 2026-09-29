// guide.mygeoverse.com: header menus (same behavior as www.mygeoverse.com) and image slots
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header.mgv");
  const items = header.querySelectorAll(".mgv-nav > .item.has-mega");
  const desktop = window.matchMedia("(min-width: 1025px)");

  const closeAll = (except) => items.forEach((it) => {
    if (it !== except) {
      it.classList.remove("open");
      it.querySelector("button").setAttribute("aria-expanded", "false");
    }
  });

  items.forEach((item) => {
    const btn = item.querySelector("button");
    let timer;
    item.addEventListener("mouseenter", () => {
      if (!desktop.matches) return;
      clearTimeout(timer);
      closeAll(item);
      item.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    });
    item.addEventListener("mouseleave", () => {
      if (!desktop.matches) return;
      timer = setTimeout(() => { item.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }, 150);
    });
    btn.addEventListener("click", () => {
      const open = !item.classList.contains("open");
      closeAll(item);
      item.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  document.addEventListener("click", (e) => { if (!header.contains(e.target)) closeAll(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });

  const burger = header.querySelector(".mgv-burger");
  burger.addEventListener("click", () => {
    const open = header.classList.toggle("menu-open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    if (!open) closeAll();
  });

  // Login (header and footer) first shows the same popup as www.mygeoverse.com;
  // the visitor reaches the login page only through the popup's button
  const modal = document.getElementById("login-modal");
  let lastFocus = null;
  const openModal = (e) => {
    e.preventDefault();
    lastFocus = e.currentTarget;
    header.classList.remove("menu-open");
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modal.querySelector(".mgv-modal-close").focus();
  };
  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocus) lastFocus.focus();
  };
  document.querySelectorAll(".js-login").forEach((a) => a.addEventListener("click", openModal));
  modal.querySelector(".mgv-modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  // Newsletter: not connected yet (the main site's form posts to WordPress)
  const news = document.querySelector(".mgv-news-form");
  if (news) news.addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector(".mgv-news-note").textContent = "Newsletter signup is not connected yet.";
  });
});
