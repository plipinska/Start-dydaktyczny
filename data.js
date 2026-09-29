/* =====================================================================
   DANE PRZEWODNIKA
   ---------------------------------------------------------------------
   Treść pochodzi z prezentacji „Gdzie szukać wsparcia.pptx”.
   Aby zaktualizować jednostkę, adres e-mail lub zakres wsparcia,
   edytuj WYŁĄCZNIE ten plik — karty, panel szczegółów, wyszukiwarka
   i ściąga „Szybki wybór” generują się z tych danych automatycznie.
   ===================================================================== */

/**
 * Obszary wsparcia (karty).
 *  id        – identyfikator (używany w adresie #obszar-<id>)
 *  icon      – nazwa ikony z <svg> sprite w index.html (#i-<icon>)
 *  title     – etykieta obszaru na karcie
 *  tags      – krótkie hasła na karcie (karta ma być szybka do zeskanowania)
 *  unitLabel – skrócona nazwa jednostki na karcie
 *  panelTitle– nazwa jednostki w nagłówku panelu szczegółów
 *  scope     – pełny zakres wsparcia (z prezentacji źródłowej)
 *  contacts  – jednostki i adresy e-mail; `note` = doprecyzowanie
 *  keywords  – dodatkowe słowa dla wyszukiwarki (formy fleksyjne, synonimy)
 *  extra     – opcjonalny dopisek pod listą kontaktów
 */
window.SUPPORT_AREAS = [
  {
    id: "organizacja",
    icon: "calendar",
    title: "Organizacja zajęć",
    tags: ["Sale", "terminy", "egzaminy", "pensum"],
    unitLabel: "Biuro Organizacji Dydaktyki / KIBS",
    panelTitle: "Biuro Organizacji Dydaktyki / KIBS",
    scope: [
      "rezerwacja sal na zajęcia",
      "terminy egzaminów",
      "konsultacje — na studiach polskojęzycznych (Biuro Organizacji Dydaktyki) i anglojęzycznych (KIBS)",
      "odwoływanie i odrabianie zajęć",
      "rozbieżności między programem studiów a danymi w sylabusie (np. godziny konsultacji i efekty uczenia się)",
      "rozliczanie pensum"
    ],
    contactsIntro: "Wybierz jednostkę według języka studiów:",
    contacts: [
      {
        name: "Biuro Organizacji Dydaktyki",
        note: "studia polskojęzyczne",
        emails: ["planowanie@kozminski.edu.pl"]
      },
      {
        name: "Kozminski International Business School (KIBS)",
        note: "studia anglojęzyczne",
        emails: ["kibsplanowanie@kozminski.edu.pl"]
      }
    ],
    keywords: ["sala", "sale", "sali", "salę", "harmonogram", "termin", "egzamin",
               "planowanie", "bod", "kibs", "odwołanie", "odwołać", "odrobić",
               "odrabianie", "konsultacje", "dyżur", "pensum", "godziny", "rezerwacja"]
  },
  {
    id: "dziekanat",
    icon: "graduation",
    title: "Sprawy studenckie",
    tags: ["Oceny", "protokoły", "zaliczenia", "sprawy osób studiujących"],
    unitLabel: "Dziekanat",
    panelTitle: "Dziekanat",
    scope: [
      "sprawy dotyczące osób studiujących",
      "oceny",
      "protokoły",
      "zaliczenia w dodatkowym terminie"
    ],
    contactsIntro: "Wybierz dziekanat właściwy dla kierunku:",
    contacts: [
      {
        name: "Dziekanat Kolegium Zarządzania oraz Kolegium Finansów i Ekonomii",
        emails: ["zif@kozminski.edu.pl"]
      },
      {
        name: "Dziekanat programów anglojęzycznych Kolegium Zarządzania oraz Kolegium Finansów i Ekonomii",
        note: "wcześniej: Dziekanat KIBS",
        emails: ["studentoffice@kozminski.edu.pl"]
      },
      {
        name: "Dziekanat Kolegium Prawa",
        emails: ["prawo@kozminski.edu.pl"]
      }
    ],
    keywords: ["ocena", "ocenę", "protokół", "zaliczenie", "zaliczyć", "poprawka",
               "student", "studentka", "studenci", "studentów", "dziekanat", "prawo",
               "zif", "studentoffice", "wpis"]
  },
  {
    id: "ceie",
    icon: "laptop",
    title: "E-learning i egzaminy online",
    tags: ["Blackboard", "e-learning", "egzaminy elektroniczne"],
    unitLabel: "Centrum Egzaminacyjne i E-learningu (CEiE)",
    panelTitle: "Centrum Egzaminacyjne i E-learningu (CEiE)",
    scope: [
      "wsparcie w przygotowaniu egzaminów elektronicznych",
      "przeprowadzanie egzaminów elektronicznych",
      "organizacja i obsługa egzaminów elektronicznych",
      "platforma Blackboard i jej funkcjonowanie",
      "produkcja materiałów e-learningowych"
    ],
    contacts: [
      {
        name: "Centrum Egzaminacyjne i E-learningu (CEiE)",
        emails: ["egzaminy@kozminski.edu.pl", "e-learning@kozminski.edu.pl"]
      }
    ],
    keywords: ["blackboard", "bb", "elearning", "e-learning", "online", "egzamin",
               "test", "platforma", "materiały", "ceie"]
  },
  {
    id: "cdd",
    icon: "lightbulb",
    title: "Metodyka i rozwój dydaktyczny",
    tags: ["Metody dydaktyczne", "projektowanie zajęć", "szkolenia", "mentoring", "AI"],
    unitLabel: "Centrum Doskonałości Dydaktycznej (CDD)",
    panelTitle: "Centrum Doskonałości Dydaktycznej (CDD)",
    scope: [
      "jakość i rozwój dydaktyki",
      "mentoring dydaktyczny",
      "realne wsparcie w zakresie prowadzenia i projektowania zajęć",
      "rozwój kompetencji dydaktycznych",
      "szkolenia i konsultacje metodyczne",
      "dobór metod dydaktycznych",
      "dobór sposobów weryfikacji efektów uczenia się",
      "wsparcie w przygotowaniu sylabusów",
      "projektowanie kursów mieszanych, online, stacjonarnych",
      "wykorzystanie AI i nowych technologii w dydaktyce",
      "wsparcie metodyczne komponentów e-learningowych"
    ],
    contacts: [
      {
        name: "Centrum Doskonałości Dydaktycznej (CDD)",
        emails: ["cdd@kozminski.edu.pl"]
      }
    ],
    keywords: ["metodyka", "metoda", "metody", "ai", "sztuczna", "inteligencja",
               "chatgpt", "szkolenie", "warsztat", "mentoring", "mentor", "sylabus",
               "kurs", "zajęcia", "efekty", "weryfikacja", "ocenianie", "kompetencje",
               "projektowanie", "dydaktyka", "cdd", "hybrydowe", "mieszane"]
  },
  {
    id: "salesforce",
    icon: "cog",
    title: "Systemy i wsparcie techniczne",
    tags: ["Sylabusy", "problemy techniczne"],
    unitLabel: "Zespół Salesforce",
    panelTitle: "Zespół Salesforce",
    scope: [
      "problemy techniczne związane z sylabusami"
    ],
    contacts: [
      {
        name: "Zespół Salesforce",
        emails: ["salesforce@kozminski.edu.pl"]
      }
    ],
    // Odsyłacz do sekcji o zgłaszaniu problemów (treść ze slajdu „Wsparcie techniczne”)
    extra: {
      text: "Zgłaszając problem z sylabusem, koniecznie podaj numer sylabusa.",
      linkText: "Jak zgłosić problem techniczny",
      href: "#wsparcie-techniczne"
    },
    keywords: ["salesforce", "sf", "sylabus", "techniczny", "techniczne", "błąd",
               "system", "nie działa", "numer"]
  }
];

/**
 * Ściąga „Nie wiesz, do kogo się zgłosić?” (slajd „Podsumowanie”).
 *  need  – „Jeśli potrzebujesz…”
 *  unit  – „Skontaktuj się z…”
 *  area  – id obszaru, który otworzy się po kliknięciu wiersza
 */
window.QUICK_PICK = [
  { need: "Sale, harmonogram, egzaminy, pensum", unit: "Biuro Organizacji Dydaktyki / KIBS", area: "organizacja" },
  { need: "Oceny, protokoły, sprawy studenckie", unit: "Dziekanat", area: "dziekanat" },
  { need: "Blackboard, e-learning, egzaminy online", unit: "CEiE", area: "ceie" },
  { need: "Metodyka nauczania, AI, sylabusy, wsparcie dydaktyczne w prowadzeniu zajęć, szkolenia, rozwój kompetencji dydaktycznych", unit: "CDD", area: "cdd" },
  { need: "Problemy techniczne z sylabusami", unit: "Salesforce", area: "salesforce" }
];
