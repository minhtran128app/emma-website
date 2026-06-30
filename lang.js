// Bilingual toggle. Default Vietnamese; remembers choice in localStorage.
(function () {
  var saved = null;
  try { saved = localStorage.getItem("emma-lang"); } catch (e) {}
  var lang = saved === "en" ? "en" : "vi";

  function apply(l) {
    document.body.classList.remove("lang-vi", "lang-en");
    document.body.classList.add("lang-" + l);
    document.documentElement.setAttribute("lang", l);
    var btns = document.querySelectorAll(".lang-switch");
    for (var i = 0; i < btns.length; i++) {
      btns[i].textContent = l === "vi" ? "EN" : "VI";
    }
    try { localStorage.setItem("emma-lang", l); } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(lang);
    var btns = document.querySelectorAll(".lang-switch");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        lang = document.body.classList.contains("lang-vi") ? "en" : "vi";
        apply(lang);
      });
    }
  });
})();
