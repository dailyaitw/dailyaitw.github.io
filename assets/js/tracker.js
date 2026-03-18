(function() {
  const SB_URL = 'https://kszbdgfbihnawjgmwjlk.supabase.co';
  const SB_KEY = 'sb_publishable_VrgzauRQ_kV_2MD0ujZ39w_0KREni_f';

  function getDeviceType() {
    const ua = navigator.userAgent;
    if (/Mobi|Android/i.test(ua)) return 'mobile';
    if (/Tablet|iPad/i.test(ua)) return 'tablet';
    return 'desktop';
  }

  function getBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
    return 'Other';
  }

  function getOS() {
    const ua = navigator.userAgent;
    if (ua.includes('Win')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
    return 'Other';
  }

  function getSessionId() {
    let sid = sessionStorage.getItem('dai_sid');
    if (!sid) {
      sid = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('dai_sid', sid);
    }
    return sid;
  }

  async function getIP() {
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      return data.ip;
    } catch (e) {
      return null;
    }
  }

  async function getGeoInfo(ip) {
    if (!ip) return {};
    try {
      const res = await fetch('https://ipapi.co/' + ip + '/json/');
      const data = await res.json();
      return { country: data.country_name, city: data.city };
    } catch (e) {
      return {};
    }
  }

  async function trackVisit() {
    const ip = await getIP();
    const geo = await getGeoInfo(ip);

    // Check if user is authenticated (from Supabase auth)
    let userId = null;
    let userEmail = null;
    let isAuth = false;
    try {
      const stored = localStorage.getItem('sb-kszbdgfbihnawjgmwjlk-auth-token');
      if (stored) {
        const session = JSON.parse(stored);
        if (session && session.user) {
          userId = session.user.id;
          userEmail = session.user.email;
          isAuth = true;
        }
      }
    } catch (e) {}

    const payload = {
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
      country: geo.country || null,
      city: geo.city || null,
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

  // Track on page load
  if (document.readyState === 'complete') {
    trackVisit();
  } else {
    window.addEventListener('load', trackVisit);
  }
})();
