// nav links border buttom on hover=====================
const navLink = $(".nav-link");

navLink.on("mouseenter", function () {
  $(this).addClass("border-bottom border-altprimary border-1");
});

navLink.on("mouseleave", function () {
  $(this).removeClass("border-bottom border-altprimary border-1");
});

// dynamic date========================================
const now = new Date();
const currentYear = now.getFullYear();
const span = $(".dynamicDate");
span.text(currentYear);
