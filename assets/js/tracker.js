(function() {
  var SB_URL = window.DAILYAI_SB_URL;
  var SB_KEY = window.DAILYAI_SB_KEY;

  function getDeviceType() {
    var ua = navigator.userAgent;
    if (/Mobi|Android/i.test(ua)) return 'mobile';
    if (/Tablet|iPad/i.test(ua)) return 'tablet';
    return 'desktop';
  }

  function getBrowser() {
    var ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
    return 'Other';
  }

  function getOS() {
    var ua = navigator.userAgent;
    if (ua.includes('Win')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
    return 'Other';
  }

  function getSessionId() {
    var sid = sessionStorage.getItem('dai_sid');
    if (!sid) {
      sid = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('dai_sid', sid);
    }
    return sid;
  }

  // Primary: Cloudflare /cdn-cgi/trace (free, unlimited, includes IP + country)
  async function getCfTrace() {
    try {
      var res = await fetch('/cdn-cgi/trace');
      var text = await res.text();
      var parsed = {};
      text.split('\n').forEach(function(line) {
        var parts = line.split('=');
        if (parts.length === 2) parsed[parts[0]] = parts[1];
      });
      return { ip: parsed.ip || null, country: parsed.loc || null };
    } catch (e) {
      return { ip: null, country: null };
    }
  }

  // Fallback: ipify for IP only
  async function getIPFallback() {
    try {
      var res = await fetch('https://api.ipify.org?format=json');
      var data = await res.json();
      return data.ip;
    } catch (e) {
      return null;
    }
  }

  // Country code to display name (common ones for this site's audience)
  var COUNTRY_NAMES = {
    TW: 'Taiwan', US: 'United States', JP: 'Japan', HK: 'Hong Kong',
    SG: 'Singapore', CN: 'China', KR: 'South Korea', GB: 'United Kingdom',
    DE: 'Germany', CA: 'Canada', AU: 'Australia', FR: 'France',
    MY: 'Malaysia', TH: 'Thailand', VN: 'Vietnam', PH: 'Philippines',
    IN: 'India', ID: 'Indonesia', NL: 'Netherlands', SE: 'Sweden'
  };

  async function trackVisit() {
    // Try Cloudflare trace first (free, unlimited)
    var cf = await getCfTrace();
    var ip = cf.ip;
    var country = cf.country ? (COUNTRY_NAMES[cf.country] || cf.country) : null;

    // Fallback to ipify if Cloudflare trace failed
    if (!ip) {
      ip = await getIPFallback();
    }

    // Check if user is authenticated
    var userId = null;
    var userEmail = null;
    var isAuth = false;
    try {
      var stored = localStorage.getItem('sb-kszbdgfbihnawjgmwjlk-auth-token');
      if (stored) {
        var session = JSON.parse(stored);
        if (session && session.user) {
          userId = session.user.id;
          userEmail = session.user.email;
          isAuth = true;
        }
      }
    } catch (e) {}

    var payload = {
      visitor_ip: ip,
      user_id: userId,
      user_email: userEmail,
      page_url: window.location.pathname,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      device_type: getDeviceType(),
      browser: getBrowser(),
      os: getOS(),
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      language: navigator.language,
      country: country,
      city: null,
      is_authenticated: isAuth,
      session_id: getSessionId()
    };

    fetch(SB_URL + '/rest/v1/visit_logs', {
      method: 'POST',
      headers: {
        'apikey': SB_KEY,
        'Authorization': 'Bearer ' + SB_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(payload)
    }).catch(function() {});
  }

  if (document.readyState === 'complete') {
    trackVisit();
  } else {
    window.addEventListener('load', trackVisit);
  }
})();
