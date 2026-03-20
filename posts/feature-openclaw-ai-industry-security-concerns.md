---
layout: default
title: OpenClaw 如何衝擊 AI 產業與其資安隱憂
---


# 🦞 OpenClaw 如何衝擊 AI 產業與其資安隱憂

---

## 核心問題：OpenClaw 到底是什麼？為什麼它如此重要？

**OpenClaw** 是一個免費開源的自主 AI 代理平台，由奧地利開發者 **Peter Steinberger** 創建。它能在使用者的裝置上本地運行，連接外部大型語言模型（Claude、DeepSeek、GPT 等），並透過使用者日常使用的通訊平台——WhatsApp、Telegram、Signal、Slack、Discord、iMessage——執行各種任務。

從清理信箱、管理日曆、自動報到航班，到執行 Shell 指令、讀寫檔案、自動化業務流程——OpenClaw 把 AI 從「聊天介面」變成了「行動代理」。

這不僅僅是一個工具，而是一場**典範轉移**。

---

## 📈 爆發式成長：四個月超越 React

OpenClaw 的崛起速度令人瞠目：

- **2025 年 11 月**：以「Clawdbot」名稱首次發布
- **2026 年 1 月 27 日**：因 Anthropic 商標投訴更名為「Moltbot」
- **2026 年 1 月 30 日**：再次更名為「OpenClaw」
- **2026 年 2 月 14 日**：創辦人 Steinberger 宣布加入 OpenAI，專案移交開源基金會
- **2026 年 3 月**：GitHub 星數突破 **25 萬**，超越 React 成為最多星的非聚合型軟體專案

Nvidia 執行長黃仁勳稱 OpenClaw 為「可能是有史以來最重要的軟體發布」，並將其採用速度比擬 Linux 的數十年發展軌跡——只是 OpenClaw 只花了四個月。

---

## 💡 對 AI 產業的五大衝擊

### 1. 從對話式 AI 到行動式 AI（Agentic AI）

OpenClaw 的核心意義在於將 AI 從「你問我答」的模式，轉變為「你說我做」的自主代理模式。這催化了整個產業向 **Agentic AI** 的加速轉型，企業開始認真部署 AI 工作流程來取代重複性任務。

### 2. 中國市場的爆發

OpenClaw 在中國達到近乎「狂熱」的程度：
- **騰訊**（2026 年 3 月 10 日）推出與微信相容的 OpenClaw 全套 AI 產品
- **百度**推出 AI「龍蝦」系列產品
- 中國 AI 概念股在黃仁勳背書後大幅上漲
- MIT Technology Review 報導了中國的「OpenClaw 淘金潮」

### 3. 硬體生態系統的響應

- **Nvidia** 發布 **NemoClaw**，專為 OpenClaw 社群打造的整合方案
- **AMD** 宣布 OpenClaw 支援，可在 Ryzen 和 Radeon 硬體上本地運行 AI 代理
- 本地端 AI 代理執行成為新的硬體競爭賽道

### 4. 技能生態系統（ClawHub）

OpenClaw 透過 **ClawHub** 建立了一個可擴展的技能市集，使用者可以安裝和分享各種自動化技能——類似於 App Store 的概念，但專為 AI 代理設計。截至目前已有超過 **10,700 個技能**上架。

### 5. 企業治理的新挑戰

**Visium Technologies** 等公司推出了專門針對「OpenClaw 式自主代理風險」的治理產品（TruContext），顯示產業已意識到需要新的管理框架來應對 AI 代理的普及。

---

## 🔓 資安隱憂：一場完美風暴

OpenClaw 的資安問題已引起全球主要資安公司的高度關注。以下是核心風險：

### 過度的系統權限

OpenClaw 運行時擁有廣泛的權限——終端存取、檔案系統存取，有時甚至是 root 層級的執行權限。它將設定資料和互動歷史儲存在本地，形成了一個高價值的攻擊目標。

### 嚴重的已知漏洞

- **CVE-2026-25253**：高嚴重性一鍵遠端程式碼執行（RCE）漏洞
- 明文儲存的 API 金鑰和憑證可透過 Prompt Injection 或不安全端點被竊取

### 暴露實例的規模驚人

根據 **Bitsight** 的研究：
- 2026 年 1 月 27 日至 2 月 8 日間，發現超過 **30,000 個暴露在公網的 OpenClaw 實例**
- 後續分析顯示數字增至 **40,000 個以上**
- 許多實例使用未加密的 HTTP 而非 HTTPS
- 暴露實例出現在**醫療、金融、政府和保險**等敏感產業
- 部署蜜罐後**數分鐘內**即出現攻擊流量

### ClawHub 上的惡意技能

在約 10,700 個 ClawHub 技能中，已有超過 **820 個被識別為惡意技能**（從 2 月初的 324 個急劇攀升）。這些惡意技能可能竊取資料、植入後門或劫持代理行為。

### Prompt Injection 攻擊

這是 AI 代理面臨的最獨特威脅：
- **直接注入**：攻擊者直接向代理輸入惡意指令
- **間接注入**：在電子郵件、網頁中嵌入惡意指令，當代理讀取這些內容時被劫持
- 已有實際案例：一個 OpenClaw Discord 機器人被操控，將**私人管理對話洩露到公開頻道**

### 供應鏈風險

在品牌更名過渡期間，出現了冒充合法基礎設施的**域名搶註和複製儲存庫**，增加了供應鏈攻擊的風險。

### 企業影子 AI

員工在企業電腦上私自部署 OpenClaw 代理，繞過 IT 治理——產生了未受管理、未受監控的 AI 代理，擁有廣泛的系統存取權限。

---

## 📊 各方資安專家怎麼說

| 機構 | 立場 |
|------|------|
| **Kaspersky** | 宣布 OpenClaw「不安全，不應使用」 |
| **CrowdStrike** | 建議部署執行時期防護並盤點所有 OpenClaw 部署 |
| **Palo Alto Networks** | 警告 OpenClaw「可能預示下一次 AI 安全危機」 |
| **Microsoft** | 發布「安全運行 OpenClaw：身份、隔離與執行時風險」指南 |
| **Cisco** | 稱個人 AI 代理如 OpenClaw 是「資安噩夢」 |
| **Immersive Labs** | 發文建議「立即卸載 OpenClaw AI」 |
| **美國東北大學** | 研究人員稱其為「隱私噩夢」 |

---

## 🌍 各國政府的回應

### 中國：限制與擁抱並存

2026 年 3 月，中國政府限制國家機關和國有企業在辦公電腦上使用 OpenClaw，理由是安全風險。然而，消費端和民間企業的採用卻如火如荼——騰訊、百度等科技巨頭紛紛推出相關產品。

這種「官方限制、民間狂熱」的矛盾現象，反映了各國在 AI 代理技術上面臨的共同困境：如何在創新與安全之間取得平衡。

### 全球監管趨勢

隨著 EU AI Act 高風險 AI 系統規範將於 2026 年 8 月全面生效，OpenClaw 這類自主代理很可能面臨更嚴格的監管。各國正在快速評估現有法規是否足以涵蓋 AI 代理帶來的新風險。

---

## 🎯 企業與個人的因應建議

### 企業端

1. **盤點所有 OpenClaw 部署**——包括員工私自安裝的影子 AI 實例
2. **建立 AI 代理治理框架**——明確哪些權限可以授予、哪些資料可以存取
3. **部署執行時期防護**——監控代理行為，偵測異常操作
4. **審查 ClawHub 技能**——僅允許經過安全驗證的技能在企業環境中使用
5. **制定 Prompt Injection 防禦策略**——特別是針對間接注入的威脅

### 個人用戶

1. **限制權限**——不要給予 OpenClaw 不必要的系統存取權限
2. **使用 HTTPS**——確保所有通訊都經過加密
3. **審查已安裝的技能**——移除來源不明的 ClawHub 技能
4. **定期更新**——保持 OpenClaw 在最新版本以修補已知漏洞
5. **不要在敏感環境中使用**——避免在處理機密資料的裝置上部署

---

## 📝 結論：AI 代理時代的雙面刃

OpenClaw 的爆發式成長證明了一件事：**AI 代理的時代已經來臨**，而且速度比任何人預期的都快。

它帶來的機遇是巨大的——自動化日常任務、降低技術門檻、讓每個人都能擁有個人 AI 助理。但隨之而來的資安風險同樣巨大——過度的權限、暴露的實例、惡意的技能、以及全新的攻擊面。

核心問題不是「是否擁抱 AI 代理」，而是「我們能否在享受其便利的同時，建立足夠的安全護欄」。

正如 OpenClaw 在四個月內從零到 25 萬星所展示的——當技術的採用速度遠超安全措施的建立速度時，我們就正處在一場完美風暴之中。**現在是認真對待 AI 代理安全的時候了。**

---

> Sources:
> - [OpenClaw - Wikipedia](https://en.wikipedia.org/wiki/OpenClaw)
> - [OpenClaw AI goes viral in China — Asia Times](https://asiatimes.com/2026/03/chinas-openclaw-ai-agent-goes-viral-raising-cybersecurity-fears/)
> - [OpenClaw Explained — KDnuggets](https://www.kdnuggets.com/openclaw-explained-the-free-ai-agent-tool-going-viral-already-in-2026)
> - [OpenClaw-Linked Chinese AI Stocks Jump — Bloomberg](https://www.bloomberg.com/news/articles/2026-03-18/china-s-openclaw-stocks-rise-as-nvidia-calls-it-the-next-chatgpt)
> - [AMD unveils OpenClaw support — TechSpot](https://www.techspot.com/news/111685-amd-unveils-openclaw-run-ai-agents-locally-ryzen.html)
> - [Nvidia Announces NemoClaw — NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw)
> - [Nvidia Says OpenClaw Is To Agentic AI What GPT Was To Chattybots — Next Platform](https://www.nextplatform.com/ai/2026/03/17/nvidia-says-openclaw-is-to-agentic-ai-what-gpt-was-to-chattybots/5209428)
> - [OpenClaw craze sweeps China — Tom's Hardware](https://www.tomshardware.com/tech-industry/artificial-intelligence/openclaw-ai-agent-craze-sweeps-china-as-authorities-seek-to-clamp-down-amid-security-fears-adoption-surges-as-state-run-enterprises-are-barred-from-use)
> - [OpenClaw Security Risks — Bitsight](https://www.bitsight.com/blog/openclaw-ai-security-risks-exposed-instances)
> - [What Security Teams Need to Know — CrowdStrike](https://www.crowdstrike.com/en-us/blog/what-security-teams-need-to-know-about-openclaw-ai-super-agent/)
> - [OpenClaw found unsafe for use — Kaspersky](https://www.kaspersky.com/blog/openclaw-vulnerabilities-exposed/55263/)
> - [OpenClaw May Signal the Next AI Security Crisis — Palo Alto Networks](https://www.paloaltonetworks.com/blog/network-security/why-moltbot-may-signal-ai-crisis/)
> - [Critical OpenClaw Vulnerability — Dark Reading](https://www.darkreading.com/application-security/critical-openclaw-vulnerability-ai-agent-risks)
> - [Running OpenClaw safely — Microsoft Security Blog](https://www.microsoft.com/en-us/security/blog/2026/02/19/running-openclaw-safely-identity-isolation-runtime-risk/)
> - [Personal AI Agents like OpenClaw Are a Security Nightmare — Cisco Blogs](https://blogs.cisco.com/ai/personal-ai-agents-like-openclaw-are-a-security-nightmare)
> - [OpenClaw AI Assistant is a 'Privacy Nightmare' — Northeastern University](https://news.northeastern.edu/2026/02/10/open-claw-ai-assistant/)
> - [Visium Technologies Launches TruContext — AIthority](https://aithority.com/machine-learning/visium-technologies-launches-trucontext-ai-governance-layer-to-contain-openclaw-style-autonomous-agent-risks/)
