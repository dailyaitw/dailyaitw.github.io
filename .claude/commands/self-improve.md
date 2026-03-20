執行 self-improve 自我檢視流程。

## 範圍

- 專案：dailyaitw.github.io（前台 Jekyll 靜態站）+ Supabase 後端
- 自行判斷可同時處理多少項目，善用平行作業
- 大任務必須拆解為可在單輪內完成的子任務，未完成的子任務列入待改善

## 時區

- 所有日期使用 **台北時間 (Asia/Taipei, UTC+8)**
- 此 Windows 系統時鐘已設為台北時間，直接使用 `date` 即可（不需 TZ=Asia/Taipei）
- 取得今天日期：`date +%m%d`（MMDD）、`date +%Y/%m/%d`（顯示用）
- 取得目前時間：`date +%H:%M`（HH:MM）

## 專案結構

```
C:\Users\mark\Documents\dailyaitw\          ← 主工作目錄（base）
├── .claude/commands/self-improve.md        ← 本命令
├── index.html, view-feature.html, ...      ← 前台（dailyaitw.github.io repo）
├── posts/                                  ← 文章內容
├── biz-core/                               ← 營運核心（dailyaitw/biz-core repo）
│   └── md/self-improve/                    ← self-improve 歷史文件
└── og-worker/                              ← OG 標籤 Cloudflare Worker
```

## Self-improve 文件存放

- 本地路徑：`biz-core/md/self-improve/`
- 遠端 repo：`dailyaitw/biz-core`（private）
- 每輪結束時 commit + push 到 biz-core repo

## 步驟

### 0. 記錄開始時間

- 執行 `date +%H:%M` 取得開始時間，記錄備用

### 1. 檢查 GitHub Issues

- 執行 `gh issue list --repo dailyaitw/dailyaitw.github.io --state open --label self-improve` 查看目前開放的 issues
- 了解哪些項目正在等待使用者參與或已有使用者回覆
- 若 issue 已被使用者回覆或核准，本輪可納入執行

### 2. 讀取上一輪的 self-improve 文件

- 掃描 `biz-core/md/self-improve/` 目錄，找到最新的文件（依檔名排序，takeN 最大者）
- 讀取該文件的「二、待改善項目」區塊，了解上次留下的待處理事項

### 3. 規劃本輪工作

- 從待改善清單中，依優先級挑選項目（🔴 > 🟡 > 🟢）
- 評估每個項目規模：
  - **小 (≤10min)** → 可直接執行
  - **中/大** → 拆解為子任務，本輪只做可完成的部分，其餘列入待改善
- 自行決定本輪處理幾個項目

### 4. 執行改善工作

- 對選定的項目：
  - 搜尋相關程式碼
  - 進行修改
  - 若需要建置或測試，執行之
- 需要使用者參與的項目（如手動測試、登入驗證、核准決策）：
  - **不要自行處理**，建立 GitHub Issue 通知使用者
  - 執行 `gh issue create --repo dailyaitw/dailyaitw.github.io --label self-improve --title "..." --body "..."`
  - Issue 內容需說明：需要什麼操作、為什麼需要、建議的處理時間
  - 在報告中記錄到「📋 需要使用者參與」區塊

### 5. 快速品質掃描

改善工作完成後，對改動的檔案做品質掃描：
- 檢查本輪改動是否有明顯的 bug、安全問題
- 記錄發現的新問題（列入待改善）

### 6. 記錄結束時間

- 執行 `date +%H:%M` 取得結束時間

### 7. 建立新的 self-improve 文件

使用台北時間取得今天日期（MMDD 格式），根據現有文件決定檔名：
- 若今天還沒有文件 → `MMDD.md`（如 `0321.md`）
- 若已有 `MMDD.md` → `MMDD-take2.md`
- 若已有 `MMDD-takeN.md` → `MMDD-take(N+1).md`

將文件寫入本地 `biz-core/md/self-improve/FILENAME.md`

文件格式：

```markdown
# 自我檢視 — YYYY/MM/DD (takeN)

> 所有時間皆為台北時間 (UTC+8)

- **開始時間**：HH:MM
- **結束時間**：HH:MM
- **耗時**：X 分鐘

---

## 📋 需要使用者參與

> 以下項目需要你的操作或核准，已建立 GitHub Issue 通知。
> 我們可以約時間一起處理。

| # | 項目 | 需要什麼 | GitHub Issue |
|---|------|----------|-------------|
| 1 | 項目名稱 | 說明需要的操作 | #issue_number |

（若本輪無需使用者參與的項目，此區塊可省略）

---

## 一、本輪完成事項

### 1. 項目名稱
- 改動內容描述
- 影響範圍

### 2. ...

---

## 二、待改善項目

### 🔴 高優先

#### 1. 項目名稱
- **現況**：目前狀態
- **問題**：具體問題
- **預估規模**：小(≤10min) / 中(需拆解) / 大(需多輪)
- **下一步**：
  - [ ] 具體行動（子任務）

### 🟡 中優先

#### N. ...

### 🟢 低優先

#### N. ...
```

### 8. Commit 和 Push（必須完成）

> ⚠️ **此步驟為必要步驟，無論前面步驟是否全部完成，都必須執行 commit + push。**
> 即使改善工作中途超時或遇到問題，也要將已完成的部分 commit + push。

**前台 repo（dailyaitw.github.io）：**
- 將所有程式碼改動 commit
- commit message 格式：`self-improve MMDD-takeN：簡述主要改動`
- `git push origin main`

**biz-core repo：**
- `cd biz-core && git add md/self-improve/ && git commit -m "新增 self-improve MMDD-takeN" && git push origin main && cd ..`

- 確認兩個 repo 都 push 成功（若失敗則 pull --rebase 後重試）

## 重要規則

- **每輪必須以 commit + push 結束**，這是最高優先的規則
- 自行決定工作量與平行度
- 大任務必須拆解，不要試圖一輪完成所有事
- 每輪都是獨立的完整文件，不修改前一輪的文件
- 所有文件內容使用繁體中文
- 所有日期使用台北時間 (UTC+8)
- 待改善項目必須分三級：🔴 高優先、🟡 中優先、🟢 低優先
- 每個待改善項目標註 **預估規模**，方便下一輪判斷是否需要拆解
- 上一輪已完成的項目不要再列入待改善
- 如果上一輪的待改善項目本輪仍未解決，繼續保留在新文件中
- GitHub 操作使用 `dailyaitw` 帳號（確認 `gh auth status` 為 dailyaitw）
