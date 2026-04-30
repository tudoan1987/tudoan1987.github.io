/* Language switcher — VI (default) / EN */
(function () {
  var KEY = 'tdm_lang';

  function getLang() {
    return localStorage.getItem(KEY) || 'vi';
  }

  function apply(lang) {
    document.documentElement.setAttribute('lang', lang);

    /* data-vi / data-en text swap */
    document.querySelectorAll('[data-vi]').forEach(function (el) {
      var t = el.getAttribute('data-' + lang);
      if (t !== null) el.textContent = t;
    });

    /* block visibility */
    document.querySelectorAll('.lang-vi, .lang-en').forEach(function (el) {
      el.style.display = el.classList.contains('lang-' + lang) ? '' : 'none';
    });

    /* toggle button label */
    var btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.querySelector('.ltl').textContent = lang === 'vi' ? 'EN' : 'VI';
      btn.dataset.cur = lang;
    }
  }

  function setLang(lang) {
    localStorage.setItem(KEY, lang);
    apply(lang);
  }

  /* Prevent flash — set html[lang] before DOM paints */
  document.documentElement.setAttribute('lang', getLang());

  document.addEventListener('DOMContentLoaded', function () {
    apply(getLang());

    var btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.dataset.cur === 'vi' ? 'en' : 'vi');
      });
    }

    /* Close mobile menu when lang changes */
  });

  window.__i18n = { set: setLang, get: getLang };
}());
