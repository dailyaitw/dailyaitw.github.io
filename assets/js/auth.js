// Supabase Auth — uses config from /assets/js/config.js
let supabaseClient = null;

function getSupabase() {
  if (!supabaseClient) {
    supabaseClient = supabase.createClient(window.DAILYAI_SB_URL, window.DAILYAI_SB_KEY);
  }
  return supabaseClient;
}

// Update the nav bar auth status
async function updateAuthNav() {
  const sb = getSupabase();
  const { data: { user } } = await sb.auth.getUser();

  const authNav = document.getElementById('auth-nav');
  if (!authNav) return;

  if (user) {
    const displayName = user.user_metadata?.full_name || user.email;
    authNav.innerHTML = `
      <span class="auth-user-info">
        <span class="auth-user-email">${escapeHtml(displayName)}</span>
        <a href="#" class="auth-logout-btn" onclick="handleLogout(event)">登出</a>
      </span>
    `;
  } else {
    authNav.innerHTML = `
      <a href="/login" class="auth-login-link">登入 / 註冊</a>
    `;
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function handleLogout(e) {
  e.preventDefault();
  const sb = getSupabase();
  await sb.auth.signOut();
  window.location.reload();
}

// Listen for auth state changes
function initAuth() {
  const sb = getSupabase();
  sb.auth.onAuthStateChange((event, session) => {
    updateAuthNav();
  });
  updateAuthNav();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuth);
} else {
  initAuth();
}
