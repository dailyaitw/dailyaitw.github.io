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
    // Update URL with lang param and reload
    var url = new URL(window.location.href);
    if (lang === 'en') {
      url.searchParams.set('lang', 'en');
    } else {
      url.searchParams.delete('lang');
    }
    window.location.href = url.toString();
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

  // Pick content with fallback notice for missing translations
  window.pickContent = function(obj, field) {
    if (getLang() === 'en') {
      var enVal = obj[field + '_en'];
      if (enVal && enVal.trim()) return enVal;
      // Fallback to Chinese with notice
      return '> *English translation not yet available. Showing original Chinese content.*\n\n---\n\n' + (obj[field] || '');
    }
    return obj[field] || '';
  };

  // Returns '&lang=en' or '' for appending to URLs
  window.langParam = function() {
    return getLang() === 'en' ? '&lang=en' : '';
  };

  // Set html lang attribute
  document.documentElement.lang = getLang() === 'en' ? 'en' : 'zh-Hant';
})();
