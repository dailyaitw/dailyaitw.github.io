部署後自動驗證。確認 dailyai.tw 關鍵功能正常運作。

## 用法

- 手動：`/self-test` 或 `/self-test https://dailyai.tw`

## 驗證項目

依序執行以下檢查，每項標示 ✅ 或 ❌，最後輸出摘要。

### 1. 基本健康檢查

```bash
# 首頁可達
curl -sL -o /dev/null -w "%{http_code}" "https://dailyai.tw/"

# 登入頁面
curl -sL -o /dev/null -w "%{http_code}" "https://dailyai.tw/login/"

# config.js 可載入
curl -sL -o /dev/null -w "%{http_code}" "https://dailyai.tw/assets/js/config.js"

# lang.js 可載入
curl -sL -o /dev/null -w "%{http_code}" "https://dailyai.tw/assets/js/lang.js"
```

預期：全部 200

### 2. SEO 檔案

```bash
# sitemap.xml
curl -sL -o /dev/null -w "%{http_code}" "https://dailyai.tw/sitemap.xml"

# robots.txt
curl -sL -o /dev/null -w "%{http_code}" "https://dailyai.tw/robots.txt"
```

預期：全部 200

### 3. 語言切換

```bash
# 首頁包含語言切換元素
curl -s "https://dailyai.tw/" | grep -c "lang-toggle"

# lang.js 包含 setLang/getLang
curl -s "https://dailyai.tw/assets/js/lang.js" | grep -c "setLang\|getLang"

# 首頁包含 t() 和 pickField() 呼叫
curl -s "https://dailyai.tw/" | grep -c "pickField\|getLang"

# ?lang=en 參數能正確設定（頁面包含英文 headings）
curl -s "https://dailyai.tw/?lang=en" | grep -c "Featured Articles\|Daily Briefings\|Loading"
```

預期：lang-toggle >= 1, setLang >= 2, pickField >= 5, English headings >= 1

### 4. Supabase API 可用

```bash
# 取得今日日報
TODAY=$(date +%Y-%m-%d)
curl -s "https://kszbdgfbihnawjgmwjlk.supabase.co/rest/v1/posts?type=eq.daily&date=eq.$TODAY&select=title,title_en" \
  -H "apikey: sb_publishable_VrgzauRQ_kV_2MD0ujZ39w_0KREni_f" \
  -H "Authorization: Bearer sb_publishable_VrgzauRQ_kV_2MD0ujZ39w_0KREni_f"

# 取得專題文章列表（確認有 _en 欄位）
curl -s "https://kszbdgfbihnawjgmwjlk.supabase.co/rest/v1/posts?type=eq.feature&select=title,title_en&limit=3&order=date.desc" \
  -H "apikey: sb_publishable_VrgzauRQ_kV_2MD0ujZ39w_0KREni_f" \
  -H "Authorization: Bearer sb_publishable_VrgzauRQ_kV_2MD0ujZ39w_0KREni_f"
```

預期：回傳 JSON 陣列，title 和 title_en 都有值

### 5. 安全檢查

```bash
# admin 頁面被 robots.txt 禁止
curl -s "https://dailyai.tw/robots.txt" | grep "admin"

# config.js 不包含 service_role key
curl -s "https://dailyai.tw/assets/js/config.js" | grep -c "sb_secret"

# posts 目錄不產生 HTML 頁面
curl -sL -o /dev/null -w "%{http_code}" "https://dailyai.tw/posts/2026-01-01.html"
```

預期：robots.txt 有 Disallow /admin, config.js 無 secret key (count=0), posts 頁面 404

### 6. GitHub Pages Build

```bash
gh run list --repo dailyaitw/dailyaitw.github.io --limit 1
```

預期：最新 build 為 completed + success

## 輸出格式

```
===== dailyai.tw 驗證 =====
時間：HH:MM (UTC+8)

1. 首頁              ✅ 200
2. 登入頁            ✅ 200
3. config.js         ✅ 200
4. lang.js           ✅ 200
5. sitemap.xml       ✅ 200
6. robots.txt        ✅ 200
7. 語言切換元素      ✅ found (13 refs)
8. EN 模式           ✅ English headings found
9. Supabase API      ✅ 今日日報有 title_en
10. 安全：無 secret  ✅ 0 matches
11. 安全：posts 404  ✅ 404
12. Build 狀態       ✅ success

結果：12/12 通過 ✅
========================
```

## 重要規則

- 所有測試用 `curl` 和 `gh` 執行
- 測試不修改任何資料
- 若有失敗項目，顯示詳細錯誤訊息並建議修復
