// guide.mygeoverse.com/tr/ : landing-page menu, footer login popup, newsletter note
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header.lp");
  const burger = header.querySelector(".lp-burger");
  const setMenu = (open) => {
    header.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  };
  burger.addEventListener("click", () => setMenu(!header.classList.contains("menu-open")));
  // anchor links scroll smoothly (CSS) and close the mobile menu
  header.querySelectorAll('.lp-nav a[href^="#"]').forEach((a) => a.addEventListener("click", () => setMenu(false)));

  // Footer "Platform Login": same popup as the English site
  const modal = document.getElementById("login-modal");
  let lastFocus = null;
  const closeModal = () => { modal.hidden = true; document.body.classList.remove("modal-open"); if (lastFocus) lastFocus.focus(); };
  document.querySelectorAll(".js-login").forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault(); lastFocus = e.currentTarget; modal.hidden = false;
    document.body.classList.add("modal-open"); modal.querySelector(".mgv-modal-close").focus();
  }));
  modal.querySelector(".mgv-modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  // Footer newsletter: same state as the English site (not connected yet)
  const news = document.querySelector(".mgv-news-form");
  if (news) news.addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector(".mgv-news-note").textContent = "Newsletter signup is not connected yet.";
  });
});
