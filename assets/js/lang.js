// Language utility for dailyai.tw
// Supports: 'zh' (Traditional Chinese, default), 'en' (English)

(function() {
  var STORAGE_KEY = 'dailyai_lang';

  // Check URL param first, then localStorage, then browser language
  var urlLang = new URLSearchParams(window.location.search).get('lang');
  if (urlLang === 'en' || urlLang === 'zh') {
    localStorage.setItem(STORAGE_KEY, urlLang);
  }

  window.getLang = function() {
    return localStorage.getItem(STORAGE_KEY) || 'zh';
  };

  window.setLang = function(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    window.location.reload();
  };

  // Pick field based on language: tries field_en first if lang=en, falls back to field
  window.pickField = function(obj, field) {
    if (getLang() === 'en') {
      var enVal = obj[field + '_en'];
      if (enVal && enVal.trim()) return enVal;
    }
    return obj[field] || '';
  };

  // Bilingual text helper
  window.t = function(zh, en) {
    return getLang() === 'en' ? en : zh;
  };

  // Set html lang attribute
  document.documentElement.lang = getLang() === 'en' ? 'en' : 'zh-Hant';
})();
