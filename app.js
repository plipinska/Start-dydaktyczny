/* =====================================================================
   Gdzie szukać wsparcia — logika interakcji (vanilla JS, bez zależności)
   Treść: js/data.js. Ten plik odpowiada wyłącznie za zachowanie strony.
   ===================================================================== */
(function () {
  "use strict";

  var AREAS = window.SUPPORT_AREAS || [];
  var QUICK = window.QUICK_PICK || [];

  var cardsEl = document.getElementById("cards");
  var panel = document.getElementById("detail-panel");
  var panelContent = document.getElementById("detail-content");
  var searchInput = document.getElementById("area-search");
  var searchStatus = document.getElementById("search-status");
  var quickRowsEl = document.getElementById("quick-rows");

  var openId = null; // id aktualnie otwartego obszaru

  /* ---------- Pomocnicze ---------- */
  function icon(name, cls) {
    return '<svg class="icon' + (cls ? " " + cls : "") + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function byId(id) {
    for (var i = 0; i < AREAS.length; i++) if (AREAS[i].id === id) return AREAS[i];
    return null;
  }
  function cardButton(id) { return document.getElementById("card-" + id); }

  /* =====================================================================
     1. KARTY
     ===================================================================== */
  function renderCards() {
    cardsEl.innerHTML = AREAS.map(function (a, i) {
      var tags = a.tags.map(esc).join('<span class="sep" aria-hidden="true">•</span>');
      return (
        '<div class="card-item" data-index="' + i + '">' +
          '<button type="button" class="card" id="card-' + a.id + '" data-area="' + a.id + '"' +
          ' aria-expanded="false" aria-controls="detail-panel">' +
            '<span class="card__icon">' + icon(a.icon) + "</span>" +
            '<span class="card__title">' + esc(a.title) + "</span>" +
            '<span class="card__tags">' + tags + "</span>" +
            '<span class="card__unit"><b>Jednostka</b>' + esc(a.unitLabel) + "</span>" +
            '<span class="card__more"><span>Zobacz szczegóły i kontakt</span>' +
              '<span class="card__chev">' + icon("chevron") + "</span></span>" +
          "</button>" +
        "</div>"
      );
    }).join("");

    cardsEl.addEventListener("click", function (e) {
      var btn = e.target.closest(".card");
      if (!btn) return;
      var id = btn.getAttribute("data-area");
      if (openId === id) closePanel(true);
      else openArea(id, { focus: true });
    });
  }

  /* =====================================================================
     2. PANEL SZCZEGÓŁÓW
     Jeden panel przenoszony w siatce tuż pod wiersz klikniętej karty —
     działa tak samo przy 3, 2 i 1 kolumnie (desktop / tablet / mobile).
     ===================================================================== */
  function panelHTML(a) {
    var many = a.scope.length > 6;
    var scope = a.scope.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("");

    var contacts = a.contacts.map(function (c) {
      var emails = c.emails.map(function (m) {
        return (
          '<li class="email">' +
            '<a href="mailto:' + esc(m) + '">' + icon("mail") + "<span>" + esc(m).replace("@", "@<wbr>") + "</span></a>" +
            '<button type="button" class="copy-btn" data-copy="' + esc(m) + '" title="Kopiuj adres" aria-label="Kopiuj adres ' + esc(m) + '">' +
              icon("copy") + "</button>" +
          "</li>"
        );
      }).join("");
      return (
        '<li class="contact">' +
          '<div class="contact__name">' + esc(c.name) + "</div>" +
          (c.note ? '<span class="contact__note">' + esc(c.note) + "</span>" : "") +
          '<ul class="contact__emails">' + emails + "</ul>" +
        "</li>"
      );
    }).join("");

    var extra = a.extra
      ? '<div class="detail__extra"><p>' + esc(a.extra.text) + "</p>" +
        '<a href="' + esc(a.extra.href) + '">' + esc(a.extra.linkText) + icon("arrow") + "</a></div>"
      : "";

    return (
      '<button type="button" class="detail__close" aria-label="Zamknij szczegóły">' + icon("x") + "</button>" +
      '<div class="detail__main">' +
        '<p class="detail__kicker">' + icon(a.icon) + esc(a.title) + "</p>" +
        '<h3 class="detail__title" id="detail-title" tabindex="-1">' + esc(a.panelTitle) + "</h3>" +
        '<h4 class="detail__h">W czym możemy pomóc?</h4>' +
        '<ul class="scope' + (many ? " scope--cols" : "") + '">' + scope + "</ul>" +
      "</div>" +
      '<div class="detail__side">' +
        '<h4 class="detail__h">Kontakt</h4>' +
        (a.contactsIntro ? '<p class="contacts-intro">' + esc(a.contactsIntro) + "</p>" : "") +
        '<ul class="contacts">' + contacts + "</ul>" +
        extra +
      "</div>"
    );
  }

  // Umieszcza panel po ostatniej karcie w wierszu karty `btn`
  function placePanel(btn) {
    if (panel.parentNode === cardsEl) cardsEl.removeChild(panel);
    var items = cardsEl.querySelectorAll(".card-item");
    var top = btn.parentNode.offsetTop;
    var last = btn.parentNode;
    for (var i = 0; i < items.length; i++) {
      if (Math.abs(items[i].offsetTop - top) < 4) last = items[i];
    }
    last.insertAdjacentElement("afterend", panel);
  }

  function openArea(id, opts) {
    opts = opts || {};
    var a = byId(id);
    var btn = cardButton(id);
    if (!a || !btn) return;

    if (openId) cardButton(openId).setAttribute("aria-expanded", "false");
    openId = id;
    btn.setAttribute("aria-expanded", "true");

    panelContent.innerHTML = panelHTML(a);
    placePanel(btn);
    panel.hidden = false;
    // restart krótkiej animacji wejścia
    panel.style.animation = "none"; void panel.offsetWidth; panel.style.animation = "";

    if (history.replaceState) history.replaceState(null, "", "#obszar-" + id);

    if (opts.focus) {
      document.getElementById("detail-title").focus({ preventScroll: true });
    }
    if (opts.scrollTo === "card") {
      btn.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function closePanel(returnFocus) {
    if (!openId) return;
    var btn = cardButton(openId);
    btn.setAttribute("aria-expanded", "false");
    panel.hidden = true;
    openId = null;
    if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
    if (returnFocus) btn.focus();
  }

  panel.addEventListener("click", function (e) {
    if (e.target.closest(".detail__close")) { closePanel(true); return; }
    var copy = e.target.closest(".copy-btn");
    if (copy) copyEmail(copy);
  });

  // Esc zamyka panel (gdy fokus jest w panelu lub na karcie)
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape" || !openId) return;
    if (panel.contains(document.activeElement) || (document.activeElement && document.activeElement.classList.contains("card"))) {
      closePanel(true);
    }
  });

  // Po zmianie szerokości okna panel wraca pod właściwy wiersz
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { if (openId) placePanel(cardButton(openId)); }, 120);
  });

  /* ---------- Kopiowanie adresu e-mail ---------- */
  function copyEmail(btn) {
    var text = btn.getAttribute("data-copy");
    var done = function () {
      btn.classList.add("is-done");
      btn.querySelector("use").setAttribute("href", "#i-check");
      btn.title = "Skopiowano";
      announce("Skopiowano adres " + text);
      setTimeout(function () {
        btn.classList.remove("is-done");
        btn.querySelector("use").setAttribute("href", "#i-copy");
        btn.title = "Kopiuj adres";
      }, 1800);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text) && done(); });
    } else if (fallbackCopy(text)) {
      done();
    }
  }
  // Niewidoczny komunikat dla czytników ekranu
  var live = document.createElement("div");
  live.className = "visually-hidden"; live.setAttribute("role", "status");
  document.body.appendChild(live);
  function announce(msg) { live.textContent = ""; setTimeout(function () { live.textContent = msg; }, 50); }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  /* =====================================================================
     3. WYSZUKIWARKA — podświetla obszary pasujące do wpisanej sprawy
     ===================================================================== */
  function norm(s) {
    return String(s).toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/ł/g, "l");
  }
  function words(s) { return norm(s).split(/[^a-z0-9]+/).filter(Boolean); }

  // Indeks słów dla każdego obszaru (tytuł, hasła, jednostki, zakres, słowa kluczowe)
  var index = AREAS.map(function (a) {
    var src = [a.title, a.unitLabel, a.panelTitle].concat(a.tags, a.scope, a.keywords || []);
    a.contacts.forEach(function (c) { src.push(c.name, c.note || ""); src = src.concat(c.emails); });
    QUICK.forEach(function (q) { if (q.area === a.id) src.push(q.need); });
    var set = {};
    words(src.join(" ")).forEach(function (w) { set[w] = true; });
    return { id: a.id, words: Object.keys(set) };
  });

  function wordMatches(q, list) {
    for (var i = 0; i < list.length; i++) {
      var w = list[i];
      if (q.length < 3) { if (w === q) return true; continue; }
      if (w.indexOf(q) === 0) return true;                    // „egzamin” → „egzaminow”
      if (w.length >= 4 && q.indexOf(w) === 0) return true;    // „sylabusy” → „sylabus”
    }
    return false;
  }

  function runSearch() {
    var qWords = words(searchInput.value).filter(function (w) { return w.length >= 3 || w === "ai"; });
    var cards = cardsEl.querySelectorAll(".card");

    if (!qWords.length) {
      cardsEl.classList.remove("is-filtering");
      for (var i = 0; i < cards.length; i++) cards[i].classList.remove("is-match");
      searchStatus.textContent = "";
      return [];
    }

    var matched = index.filter(function (entry) {
      return qWords.every(function (q) { return wordMatches(q, entry.words); });
    }).map(function (e) { return e.id; });

    cardsEl.classList.add("is-filtering");
    for (var j = 0; j < cards.length; j++) {
      cards[j].classList.toggle("is-match", matched.indexOf(cards[j].getAttribute("data-area")) > -1);
    }

    if (!matched.length) {
      searchStatus.innerHTML = "Brak dopasowań. Spróbuj innego słowa lub skorzystaj ze ściągi <a href=\"#szybki-wybor\">„Szybki wybór”</a>.";
    } else {
      var names = matched.map(function (id) { return "<strong>" + esc(byId(id).title) + "</strong>"; }).join(", ");
      searchStatus.innerHTML = (matched.length === 1 ? "Pasujący obszar: " : "Pasujące obszary: ") + names +
        ". Enter otwiera " + (matched.length === 1 ? "szczegóły." : "pierwszy z nich.");
    }
    return matched;
  }

  searchInput.addEventListener("input", runSearch);
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      var m = runSearch();
      if (m.length) openArea(m[0], { focus: true });
    } else if (e.key === "Escape" && searchInput.value) {
      searchInput.value = ""; runSearch();
    }
  });

  /* =====================================================================
     4. SZYBKI WYBÓR — wiersz otwiera odpowiednią kartę
     ===================================================================== */
  function renderQuick() {
    quickRowsEl.innerHTML = QUICK.map(function (q) {
      var a = byId(q.area);
      return (
        "<li>" +
          '<button type="button" class="quick-row" data-area="' + q.area + '">' +
            '<span class="quick-row__need">' + (a ? '<span class="quick-row__icon">' + icon(a.icon) + "</span>" : "") + esc(q.need) + "</span>" +
            '<span class="quick-row__arrow" aria-hidden="true">' + icon("arrow") + "</span>" +
            '<span class="quick-row__unit"><span><span class="visually-hidden">Skontaktuj się z: </span>' + esc(q.unit) + "</span>" + icon("chevron") + "</span>" +
          "</button>" +
        "</li>"
      );
    }).join("");

    quickRowsEl.addEventListener("click", function (e) {
      var row = e.target.closest(".quick-row");
      if (!row) return;
      openArea(row.getAttribute("data-area"), { focus: true, scrollTo: "card" });
    });
  }

  /* =====================================================================
     5. NAWIGACJA — podświetlenie bieżącej sekcji
     ===================================================================== */
  function initNav() {
    var links = document.querySelectorAll(".site-nav a");
    if (!("IntersectionObserver" in window) || !links.length) return;
    var map = {};
    links.forEach(function (l) { map[l.getAttribute("href").slice(1)] = l; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (l) { l.classList.remove("is-active"); l.removeAttribute("aria-current"); });
          map[en.target.id].classList.add("is-active");
          map[en.target.id].setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ---------- Start ---------- */
  renderCards();
  renderQuick();
  initNav();

  // Link bezpośredni do obszaru, np. index.html#obszar-cdd
  function openFromHash() {
    var m = location.hash.match(/^#obszar-([\w-]+)$/);
    if (m && byId(m[1]) && openId !== m[1]) openArea(m[1], { scrollTo: "card" });
  }
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
})();
