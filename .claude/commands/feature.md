發布 Feature 專題文章到 dailyai.tw。

## 用法

- `/feature {主題描述}` — 研究、撰寫並發布專題文章

## Slug 格式

- `YYYY-MM-{descriptive-slug}`（如 `2026-03-google-notebooklm-technology-ecosystem`）
- 月份對應內容月份：三月文章用 `2026-03-*`，四月用 `2026-04-*`

## 發布流程

1. **研究**：用 WebSearch 蒐集主題相關資訊
2. **撰寫**：中英文同時完成，結構為：引言 → 核心分析 → 台灣觀點 → Sources
3. **存檔**：`posts/feature-{slug}.md`（本地備份可含 frontmatter）
4. **插入 Supabase**：type=`feature`，中英文欄位都填（不留 null），`is_free: true`（預設公開）
5. **更新 config.js**：`DAILYAI_SHORT_LINKS` 加下一個序號
6. **Git commit + push**
7. **執行 /self-test**

## 重要規則

- **Supabase content 不可包含 Jekyll frontmatter**：`---\nlayout: default\n---` 和 `[← 回首頁](/)` 等導航元素只放在本地 md 檔，不放入 Supabase 的 content/content_en 欄位。Supabase 內容直接從 `# 標題` 開始。
- **所有 feature 預設 `is_free: true`**，除非用戶明確指定需登入。
