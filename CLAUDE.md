# Claude Code — dailyai.tw 操作指南

## 專案概覽

Daily AI Taiwan (dailyai.tw) — 雙語 AI 新聞平台，Jekyll + GitHub Pages 前端 + Supabase 後端。

## 四種文章類型

| Type | 說明 | 日期格式 | 付費邏輯 |
|------|------|---------|---------|
| `daily` | 每日日報 | `YYYY-MM-DD` | 7 天內免費，之後需登入 |
| `monthly` | 月度回顧 | `YYYY-MM-01` | 需登入 |
| `yearly` | 年度回顧 | `YYYY-12-31` | 需登入 |
| `feature` | 專題文章 | 依排程日期遞增 | `is_free` 欄位控制 |

## Feature 文章發布 SOP（最重要）

### 完整步驟：

1. **寫文章** → 存到 `posts/feature-{slug}.md`
2. **插入 Supabase** → type=`feature`，必須包含：
   - `date`: 下一個可用日期（feature 文章按日期遞增排程，先查 `GET /posts?type=eq.feature&order=date.desc&limit=1` 取得最新日期 +1 天）
   - `slug`: `YYYY-MM-descriptive-slug`（如 `2026-03-bgm-manufacturing-frontiers`）
   - `is_free`: true（公開）或 false（需登入）
   - `title`, `summary`, `content`（中文）
   - 選填：`title_en`, `summary_en`, `content_en`（英文翻譯）
3. **更新 config.js** → 在 `DAILYAI_SHORT_LINKS` 加入下一個序號：
   ```js
   'N': 'YYYY-MM-slug'
   ```
4. **Git commit + push** → 包含 markdown 檔和 config.js
5. **驗證** → 訪問 `dailyai.tw/?s=N` 確認可開啟

### Supabase 插入範例：
```python
payload = {
    'date': '2026-03-29',        # 下一個排程日期
    'type': 'feature',
    'title': '中文標題',
    'summary': '中文摘要',
    'content': content,           # markdown 全文
    'slug': '2026-03-my-slug',
    'is_free': True
}
```

### 注意事項：
- Supabase 有 unique constraint `(date, type)`，所以同類型同日期只能有一篇
- Feature 文章日期是排程用的（不一定是寫作日期），要查最新 feature 日期 +1
- **不要**用 `feature2` 等變通 type，永遠用 `feature`
- 插入時要用 UTF-8 encoding：`open(file, encoding='utf-8')`

## Daily 日報發布 SOP

1. 用 WebSearch 搜尋今日 AI 新聞
2. 按格式生成日報（重點、投資、技術、社會、觀點）
3. 存到 `posts/YYYY-MM-DD.md`
4. 插入 Supabase：type=`daily`, date=今天
5. Git commit + push
6. 完成後不需要問用戶確認

## Supabase 連線資訊

- URL: `https://kszbdgfbihnawjgmwjlk.supabase.co`
- Public Key: 在 `assets/js/config.js` 裡（前端用）
- Secret Key: 在 `.env` 檔（`C:\2026\dailytw\.env`）— 寫入用
- Python 讀取時一定要加 `encoding='utf-8'`

## Git 操作

- 帳號：`gh auth switch --user dailyaitw`
- Repo：`dailyaitw/dailyaitw.github.io`
- 每次操作前確認帳號正確

## 前端架構重點

- `index.html` — 首頁（今日日報 + 專題列表 + 所有日報）
- `view-feature.html` — 專題文章頁（by slug）
- `post.html` — 日報/月報/年報頁
- `admin.html` — 管理後台（流量、用戶、聯繫）
- `assets/js/config.js` — Supabase key + 短連結映射
- `assets/js/lang.js` — 雙語切換邏輯
- `assets/js/auth.js` — 認證流程
- `assets/js/tracker.js` — 訪問追蹤

## Posts 目錄

- `posts/` 是本地 markdown 備份，**不是** Jekyll 建置來源
- **Source of truth 是 Supabase**
- 檔名：daily 用 `YYYY-MM-DD.md`，feature 用 `feature-{slug}.md`

## 雙語支援

所有文章都有中英文欄位：
- `title` / `title_en`
- `summary` / `summary_en`
- `content` / `content_en`

翻譯工具：`node scripts/translate-posts.js`（需要 ANTHROPIC_API_KEY）

## 短連結系統

- `dailyai.tw/?s=N` → 對應 feature 文章
- 映射在 `config.js` 的 `DAILYAI_SHORT_LINKS`
- 每篇新 feature 要加下一個序號
