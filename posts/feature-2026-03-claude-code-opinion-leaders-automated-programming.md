---
layout: default
title: 意見領袖眼中的 Claude Code：自動編程時代的第一手體驗
slug: 2026-03-claude-code-opinion-leaders-automated-programming
---

[← 回首頁](/)

# 意見領袖眼中的 Claude Code：自動編程時代的第一手體驗

**Daily AI Taiwan 專題報導 — 2026/03**

---

2025 年底，Anthropic 推出了 Claude Code——一個運行在終端機中的 AI 編程代理。短短半年內，它達成了 $25 億年化營收、開發者「最愛工具」調查 46% 的得票率，以及一場席捲科技圈的工作方式革命。

但數字只是表象。真正有意思的是：那些每天寫程式、帶團隊、做產品的業界頂尖人物，實際用了 Claude Code 之後，**到底怎麼說？**

本文匯整了 10 位意見領袖的第一手體驗，從 AI 研究先驅到獨立駭客、從 Y Combinator 執行長到全職工程師，完整呈現自動編程時代的真實面貌。

---

## 一、Andrej Karpathy — 前 Tesla AI 總監、OpenAI 共同創辦人

> 「我在十二月從 80% 手動編碼 + 20% 代理，快速翻轉成了 80% 代理編碼 + 20% 手動修改。我現在真的主要是在用英文寫程式了。」

Karpathy 是全球最具影響力的 AI 從業者之一，他對 Claude Code 的核心觀察是：

**生產力的瓶頸不再是智力，而是耐力。**

> 「看一個代理不知疲倦地工作非常有趣。它們永遠不會累，永遠不會沮喪，就是一直做下去……你會意識到耐力是工作的核心瓶頸，而 LLM 把這個瓶頸大幅拓寬了。」

他分享了一個關鍵的方法論轉變：**從命令式變成宣告式**。

> 「不要告訴它該做什麼，給它成功條件，然後看著它自己跑……把你的方式從命令式改成宣告式，讓代理循環更長、獲得更大槓桿。」

但 Karpathy 也坦率指出問題：AI 仍會犯「微妙的概念性錯誤」、過度抽象、堆積死程式碼、盲目跟隨假設。他形容 AI 編程代理像「一個粗心、急躁、但知識非常淵博的初級開發者」。

**最尖銳的預言**：頂尖工程師與一般工程師之間的生產力差距將「急劇擴大」，因為 AI 會放大優秀的心智模型和架構能力——但不會為你創造這些能力。

---

## 二、Boris Cherny — Claude Code 創造者、Anthropic 工程主管

> 「我認為今天編程對我來說實際上已經被解決了，而且我認為不久之後對每個人都會是如此。」

Boris Cherny 是 Claude Code 的發明者，前 Meta 首席工程師、《Programming TypeScript》作者。他的使用方式或許是最極端的：

> **「自十一月以來，我沒有親手編輯過一行程式碼。」**（他仍然會審查程式碼。）

Cherny 將 AI 對軟體工程的影響比作印刷術對抄寫員的衝擊：

> 「到今年底，每個人都將成為產品經理，每個人都能寫程式。『軟體工程師』這個頭銜將開始消失，取而代之的是『建造者（builder）』。」

他的工作流程已經進化到「平行代理」模式——同時開啟多個 Claude Code 實例處理不同任務，每個實例負責獨立的 PR，搭配結構化的審查模式（deterministic review patterns）。

**對想入行的人的建議**：成為通才。跨設計、基礎設施、商業思維的跨領域能力，將比深度技術專精更有價值。

---

## 三、Simon Willison — Django 共同創造者

**30 天內：259 個 PR、497 個 commit、40,000 行新增、38,000 行刪除。每一行都由 Claude Code 撰寫。**

Simon Willison 是 Python 世界最受尊敬的開發者之一。他對 Claude Code 的定位出人意料：

> **「Claude Code 是一個偽裝成開發者工具的通用代理。它的名字取得很差——因為它能自動化任何電腦任務，不只是寫程式。」**

Willison 強調，AI 沒有消除「解謎的樂趣」——消除的是繁瑣的勞動：寫最小可重現案例、翻找除錯日誌、解讀 AWS IAM 錯誤。

他甚至為 Claude Code 量身打造了專用工具：Rodney（瀏覽器自動化）和 Showboat（文件 CLI），刻意設計清晰的 `--help` 輸出，讓 AI 代理能更好地理解指令。

**Willison 的工作流洞察**：真正的高手不只是「用 AI 寫程式」，而是**打造讓 AI 更好用的工具生態**。

---

## 四、Garry Tan — Y Combinator 執行長

**60 天內寫了超過 60 萬行生產程式碼。這還是他兼職做的。**

Garry Tan 把他的 Claude Code 工作流開源為「GStack」，一個基於角色的系統，使用 6 個自訂斜線命令（CEO、工程經理、資深工程師、發布經理、QA 工程師、DevOps 工程師）。GStack 在幾天內獲得近 2 萬 GitHub 星星和 2,200 個 fork。

他在 SXSW 2026 開玩笑說，每天只睡四小時的興奮狀態叫做「cyber psychosis（網路精神病）」。

> 每天 10,000-20,000 行可用程式碼。7 天 100 個 PR。

社群反應兩極：粉絲推崇這個結構化方法，批評者嗤之以鼻說「不過就是一堆文字檔裡的提示詞」。

**但 Tan 的做法揭示了一個關鍵趨勢**：在 AI 編程時代，工作流設計（而非程式碼撰寫）正在成為核心競爭力。

---

## 五、Pieter Levels (@levelsio) — NomadList & RemoteOK 創辦人

Pieter Levels 是「Vibe Coding」運動的先驅，一個自學開發者，連續創辦了 40 多個產品。

他用 Claude Code 在沒有任何遊戲開發經驗的情況下，打造了 Fly.Pieter.com——一個 3D 瀏覽器 MMO 飛行模擬器，年化營收破 $100 萬。

最新的工作流更加激進：**VibeOps**——把 Claude Code 直接裝在 $5/月的 Hetzner VPS 上，透過 SSH 連線，讓 Claude 自己選技術棧（Python 或 Node）然後自動建構。

**Levels 的哲學**：從想法到盈利產品的時間軸已經從「數月」壓縮到「數小時的提示」。門檻不在於會不會寫程式，而在於你有沒有好的產品直覺。

---

## 六、Dario Amodei — Anthropic 執行長

> 「我認為三到六個月內，AI 將撰寫 90% 的程式碼。再過十二個月，AI 可能撰寫幾乎所有的程式碼。」

身為 Anthropic 的共同創辦人兼執行長，Amodei 當然是最樂觀的聲音。但支撐他信心的數字令人側目：

- Claude Code 上線六個月達到 **$10 億年化營收**
- 兩個月後翻倍至 **$25 億**
- 週活躍使用者自 2026 年 1 月起已翻倍
- Anthropic 有望在 2026 年底超越 OpenAI 的營收

Amodei 也堅持 Scaling Law 尚未觸頂，2026 年將出現「激進加速」。

---

## 七、Kent C. Dodds — 開發者教育家、Testing Library 創造者

Dodds 是 React/JS 生態系中最具影響力的教育者之一，他的選擇本身就是一個信號：

他在 egghead.io 推出了「Become a Claude Code Power-User」完整工作坊，涵蓋上下文工程（context engineering）、SDK 腳本化、Claude Hooks、以及 MCP 協議。

更進一步，他為自己的 Epic Workshop 應用打造了專門的 MCP 伺服器，讓學習者可以用 AI 編輯器直接詢問特定練習題。

**這意味著什麼**：當頂級教育者把 Claude Code 當作值得開設完整課程的「新技能」，而不只是一個輔助工具，我們正在見證一個新職業能力類別的誕生。

---

## 八、Morten Vistisen — 資深軟體工程師

在一個月的深度實驗後，Vistisen 提煉出兩個成功關鍵：

1. **在實作前建立清晰的計畫**
2. **高效管理上下文窗口**

他的工作流是兩步式：先在 markdown 中生成詳細計畫 → 清除上下文 → 以全新聚焦實作。大型功能被拆成 500 行一組的子任務，搭配摘要文件維持上下文連續性。

> 「讓它能用、讓它快、讓它漂亮。永遠照這個順序。」

**最重要的觀察**：他拒絕了「AI 將取代開發者」的敘事，把 AI 類比為 WordPress——「技術通常是擴大市場，而不是消滅從業者」。

---

## 九、Paul Ford — 科技作家、前 Postlight 執行長

> 「當一切到位、提示順利時，我可以在週末當作娛樂，完成價值數十萬美元的工作。」

Ford 注意到 2025 年 11 月 Claude Code「突然變得好很多」，從那之後他開始清理擱置了十年的副專案。

**每天投入**：大約半小時他的時間，一小時 Claude 的時間。

這或許是最能引起共鳴的場景：不是要取代誰的工作，而是釋放被封存已久的創造力。

---

## 十、Gergely Orosz — 《The Pragmatic Engineer》作者

作為擁有百萬訂閱者的工程電子報主筆，Orosz 在 2026 年 3 月對 Boris Cherny 進行了深度專訪，探討 Claude Code 如何從 Anthropic 內部的副專案演變為核心產品。

他提出了整個產業都在思考的問題：

> **「當我們不再親手寫程式碼時，軟體工程意味著什麼？」**

---

## 開發者調查數據：市場怎麼看？

| 指標 | Claude Code | Cursor | GitHub Copilot |
|------|------------|--------|----------------|
| 開發者「最愛」比率 | **46%** | 19% | 9% |
| 盲測程式碼品質勝率 | **67%** | — | — |
| 定位 | 終端機原生、完全自主 | IDE 原生、流暢整合 | 外掛式、企業合規 |

彭博社將這場變革稱為「2026 年大生產力恐慌」（The Great Productivity Panic of 2026），指出 AI 編程代理本應讓開發變得更輕鬆，結果卻觸發了一場不計代價加速建造的高壓競賽。

---

## 總結：五個關鍵洞察

**1. 「用英文寫程式」已不是比喻，而是現實。** Karpathy 80% 的程式碼由代理完成；Cherny 不再親手編輯任何一行；Willison 一個月 497 個 commit 全出自 AI。我們正處於從「AI 輔助」到「AI 主導」的臨界點。

**2. 真正的差距不在工具，在心智模型。** 每位意見領袖都強調：AI 放大的是你的思維能力，不是手指速度。Karpathy 警告頂尖與一般工程師的差距將急劇擴大；Tan 靠工作流設計而非程式碼量取勝。

**3. 新的核心能力是「上下文工程」。** Vistisen 的 500 行子任務拆分、Willison 為 AI 量身打造工具、Dodds 的 MCP 伺服器——所有最有效的使用者都在做同一件事：設計讓 AI 能持續高效運作的環境。

**4. 「Builder」正在取代「Software Engineer」。** Cherny 的預言不是空談——當 Levels 沒有遊戲開發經驗卻能做出百萬營收的遊戲，當 Tan 以 CEO 身份兼職寫出 60 萬行程式碼，「會不會寫程式」已不再是瓶頸，「會不會定義產品」才是。

**5. 這不是終點，是加速的起點。** Amodei 預測十二個月內 AI 寫幾乎所有程式碼；摩根士丹利警告「多數人沒準備好」；Karpathy 說 2026 年「能量極高」。每一位受訪者的語氣都指向同一個方向：**我們還沒看到最激烈的變化。**

---

> **Sources:**
> - [Karpathy's Claude Code Field Notes — DEV Community](https://dev.to/jasonguo/karpathys-claude-code-field-notes-real-experience-and-deep-reflections-on-the-ai-programming-era-4e2f)
> - [Boris Cherny Interview — Fortune](https://fortune.com/2026/02/24/will-claude-destroy-software-engineer-coding-jobs-creator-says-printing-press/)
> - [Building Claude Code — Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny)
> - [Simon Willison on Claude Code](https://simonwillison.net/tags/claude-code/)
> - [GStack by Garry Tan — TechCrunch](https://techcrunch.com/2026/03/17/why-garry-tans-claude-code-setup-has-gotten-so-much-love-and-hate/)
> - [Pieter Levels VibeOps — X](https://x.com/levelsio/status/1953022273595506910)
> - [Dario Amodei on AI Code — Daring Fireball](https://daringfireball.net/linked/2026/03/13/amodei-ai-code-claim-chowder)
> - [Kent C. Dodds Claude Code Workshop — egghead.io](https://egghead.io/workshop/claude-code)
> - [One Month With Claude Code — Morten Vistisen](https://mortenvistisen.com/posts/one-month-with-claude-code)
> - [Claude Code vs Cursor vs Copilot — DEV Community](https://dev.to/alexcloudstar/claude-code-vs-cursor-vs-github-copilot-the-2026-ai-coding-tool-showdown-53n4)
> - [The Great Productivity Panic — Bloomberg](https://www.bloomberg.com/news/articles/2026-02-26/ai-coding-agents-like-claude-code-are-fueling-a-productivity-panic-in-tech)
