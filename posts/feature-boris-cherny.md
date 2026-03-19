---
layout: default
title: 意見領袖：Boris Cherny — Claude Code 之父
---

[← 回首頁](/)

# 🧠 意見領袖：Boris Cherny — Claude Code 之父，「寫程式已被解決」的佈道者

---

## 💡 影響力與核心信念

Boris Cherny 是 Anthropic 的 **Claude Code 負責人暨創造者**——這款從一年前的終端機原型，成長為重新定義軟體工程的 AI 工具。他的核心主張震撼了整個科技產業：

> **「寫程式（Coding）已經基本被解決了。」**

自 2025 年 11 月起，Boris 沒有親手寫過一行程式碼——100% 的程式碼都由 Claude Code 撰寫。但他同時是 Anthropic 最高產的工程師之一，每天交付 20-30 個 Pull Request。

他的信念不是「AI 取代工程師」，而是**工程師角色的根本轉變**：

- **從「寫程式的人」變成「建造者（Builder）」** — 未來最有價值的人不是最會寫 code 的人，而是最懂得「該建什麼」的人
- **每個人都能寫程式** — 在 Claude Code 團隊裡，產品經理寫程式、設計師寫程式、財務人員寫程式、資料科學家寫程式
- **「品味」比「技術」更重要** — 當 AI 能一鍵實現程式碼，判斷「什麼值得做」的能力成為最稀缺的技能
- **印刷術的歷史類比** — 印刷術把識字率從 1% 提升到 70%，花了 200 年；AI 正在對程式設計做同樣的事，但速度快得多

---

## 👤 個人背景

- **出生地**：烏克蘭敖德薩（Odessa）
- **移民**：1995 年隨家人移居美國
- **學歷**：加州大學聖地牙哥分校（UCSD），主修經濟學（非電腦科學）
- **著作**：《Programming TypeScript》（O'Reilly 出版）
- **創業**：18 歲時創立第一家新創公司
- **早期經歷**：曾在避險基金工作，一位同事引導他接觸函數式程式設計（Scala）

---

## 🏢 職業歷程

### Meta（2017-2024）

Boris 於 2017 年 11 月加入 Meta（當時的 Facebook），從 Software Engineer 一路晉升至 **Principal Software Engineer（IC8）**——這是 Meta 技術職涯中非常高的層級。在近七年的任期中：

- 領導「Chats in Groups」專案，將 Messenger 功能整合進 Facebook Groups
- 成為 Meta 最活躍的 code reviewer 之一
- 累積了大規模系統設計與跨團隊協作的深厚經驗

### Anthropic（2024 年 9 月至今）

Boris 於 2024 年 9 月加入 Anthropic 擔任創始工程師（Founding Engineer），使用 Claude 3.6 模型打造了 Claude Code 的原型。現任 **Head of Claude Code**。

在他的帶領下：
- Claude Code 從簡單的終端機原型成長為改變軟體開發方式的旗艦產品
- Anthropic 工程師人均生產力提升近 **200%**
- 即使公司規模年初至今成長三倍，每位工程師的產出仍持續提升 70%

---

## ⚡ Boris 的 Claude Code 工作流

Boris 在 2026 年 1 月公開分享了他的工作流程，引起開發者社群轟動：

### 平行實例運作
- 本地同時執行 **5 個 Claude Code 實例**，每個在獨立的 git checkout
- 終端標籤編號 1-5，用系統通知追蹤哪個 Claude 需要輸入
- 同時在 claude.ai/code 上執行 **5-10 個額外實例**
- 用 `--teleport` 在本地和網頁之間轉移 session

### CLAUDE.md 團隊協作
- 整個 repo 共用一份 CLAUDE.md，全團隊每週多次更新
- 每當 Claude 犯錯，就把糾正加進 CLAUDE.md，確保不再重複
- 這成為團隊的「AI 行為規範」

### Hooks 自動化
- 使用 PostToolUse hook 在 Claude 編輯後自動格式化程式碼
- Claude 本身產出的格式已經很好，hook 處理最後 10% 避免 CI 格式錯誤

### 進階功能
- `/batch` 指令：將工作分配給平行 agent，每個在獨立 worktree 中測試並建立 PR
- `/loop` 指令：讓 Claude 執行最長 3 天的無人值守重複任務

---

## 🎙️ Lenny's Podcast 精華（2026/02/19）

Boris 在 Lenny Rachitsky 的 Podcast 上進行了約 90 分鐘的深度訪談，主題為「寫程式被解決後會發生什麼」，被譽為「關於軟體未來最清晰的思考」。

### 核心觀點

1. **程式設計已被解決** — 對多數使用場景而言，AI 寫程式的能力已足夠好。挑戰從「如何寫」轉移到「該寫什麼」

2. **工程師到建造者** — 「軟體工程師」這個頭銜可能會消失，取而代之的是「builder」——一個人人都能寫程式、人人都是某種產品經理的世界

3. **通才勝過專才** — 未來最被獎勵的不只是 AI-native 的人，而是**好奇的通才**，能思考更廣泛問題的人

4. **Claude 已不只是工具** — Claude 現在能分析 bug 報告、使用者回饋和遙測數據，主動提出產品建議和修復方案——更像一個積極的同事，而非被動的工具

5. **算力勝過人力** — 用更少的人搭配無限的 token 預算，比僱更多人更有效率

6. **工作滿意度上升** — Lenny 的非正式 Twitter 調查顯示，約 70% 的工程師和 PM 表示使用 AI 工具後更享受工作

### YouTube 完整訪談

📺 [Head of Claude Code: What happens after coding is solved - Boris Cherny](https://youtu.be/We7BZVKbCVw?si=YgiRQNYX7DNRGWNg)

---

## 📊 為什麼你該關注 Boris Cherny

Boris Cherny 不只是一個產品的負責人——他代表的是**軟體產業正在發生的範式轉移**的最前線觀察者和推動者。

- 如果你是**工程師**：他的工作流程和對「builder」角色的定義，是理解自身職涯未來方向的關鍵參考
- 如果你是**產品經理**：「品味」和「判斷該建什麼」正在成為最重要的技能，而非技術實作能力
- 如果你是**創業者**：他展示了用更少人力、更多 AI 算力達到更高產出的新模式
- 如果你是**學生**：不需要 CS 學位也能成為頂尖工程師——Boris 自己就是最好的證明

---

> Sources:
> - [Lenny's Podcast — Head of Claude Code: What happens after coding is solved](https://www.lennysnewsletter.com/p/head-of-claude-code-what-happens)
> - [YouTube — Boris Cherny on Lenny's Podcast](https://youtu.be/We7BZVKbCVw?si=YgiRQNYX7DNRGWNg)
> - [The Pragmatic Engineer — Building Claude Code with Boris Cherny](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny)
> - [Developing Dev — Boris Cherny on How His Career Grew](https://www.developing.dev/p/boris-cherny-creator-of-claude-code)
> - [VentureBeat — Creator of Claude Code Reveals His Workflow](https://venturebeat.com/technology/the-creator-of-claude-code-just-revealed-his-workflow-and-developers-are)
> - [How Boris Uses Claude Code](https://howborisusesclaudecode.com)
> - [dev.ua — Boris Cherny born in Ukraine](https://dev.ua/en/news/tvorets-claude-code-borys-chernyi-rozpoviv-shcho-narodyvsia-v-ukraini-i-emihruvav-do-ssha-u-1995-rotsi-1771602015)
> - [Waydev — 8 Insights from Anthropic Claude Code Boris Cherny](https://waydev.co/8-game-changing-insights-from-anthropic-claudecode-boris-cherny/)
> - [InfoQ — Inside the Development Workflow of Claude Code's Creator](https://www.infoq.com/news/2026/01/claude-code-creator-workflow/)
