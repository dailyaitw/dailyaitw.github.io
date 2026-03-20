---
layout: default
title: OpenClaw 已證實的重大資安事件及其後續處理實況
---


# 🚨 OpenClaw 已證實的重大資安事件及其後續處理實況

---

## 前言：不是理論風險，而是真實事件

OpenClaw 在四個月內從零到 25 萬 GitHub 星，但伴隨爆發式成長而來的，是一連串**已被證實的重大資安事件**。本文不談「可能的風險」，而是記錄每一起**已發生、已被驗證的真實事件**——包括漏洞細節、攻擊鏈、影響範圍，以及 OpenClaw 團隊的回應與修補時程。

---

## 🔴 事件一：CVE-2026-25253 — 一鍵遠端程式碼執行（RCE）

**嚴重性：** CVSS 8.8（高危）
**影響版本：** 2026.1.29 之前所有版本
**發現者：** Oasis Security 研究團隊

### 漏洞機制

OpenClaw 錯誤地假設所有來自 localhost 的連線都可以被隱式信任。應用程式透過 URL 查詢字串接受 `gatewayUrl` 參數，並**自動建立 WebSocket 連線且傳送認證憑證**，完全沒有來源驗證或白名單機制。

### 攻擊鏈（毫秒級完成）

1. 受害者訪問任何攻擊者控制的網站
2. JavaScript 靜默開啟 WebSocket 連線至 OpenClaw 閘道
3. 認證 Token 透過跨站 WebSocket 劫持被竊取
4. 攻擊者使用竊取的 Token 關閉使用者確認機制（`ask: "off"`）
5. 強制命令在主機上直接執行（而非 Docker 容器中）
6. 發送 `node.invoke` 請求執行任意 Shell 指令

### 時間軸

| 日期 | 事件 |
|------|------|
| 2026/01/26 | Hacker News 上公開討論漏洞；數小時內開始出現掃描行為 |
| 2026/01/30 | OpenClaw 團隊發布修補版本 2026.1.29（靜默修補） |
| 2026/02/03 | 完整公開揭露，CVSS 8.8 評級 |

### 修補措施

新增 `gatewayUrl` 變更時的確認提示；後續更新實施嚴格的 Origin 驗證控制，拒絕缺少或無效 Origin 標頭的請求。

**回應速度：從通報到修補不到 24 小時。**

---

## 🔴 事件二：ClawJacked — 暴力破解代理接管漏洞

**發現者：** Oasis Security
**修補版本：** 2026.2.26（2026 年 2 月 26 日發布）

### 漏洞機制

OpenClaw 的閘道對 localhost 連線**免除速率限制**，攻擊者可以每秒數百次的速度暴力破解密碼而不觸發任何警報。WebSocket 協議又繞過了瀏覽器的跨來源保護。

### 攻擊鏈（五階段）

1. 受害者訪問攻擊者控制的網站
2. JavaScript 靜默開啟 WebSocket 連線至本機 OpenClaw 埠
3. 腳本以高速暴力破解閘道密碼
4. 惡意腳本自動註冊為受信任裝置（無需使用者確認）
5. 取得完整管理員級控制權

### 影響

完全工作站入侵：可與 AI 代理互動、提取設定和日誌、列舉已連線的節點/裝置，並在關聯機器上執行指令。

**回應速度：從發現到修補不到 24 小時。**

---

## 🔴 事件三：30,000-42,000+ 暴露實例

### 多方研究機構的發現（2026 年 1 月 25 日至 2 月 8 日）

| 研究機構 | 發現數量 | 備註 |
|----------|----------|------|
| **Bitsight** | 30,000+ 個 | 監測 1/27-2/8，每日高峰約 5,000 個 |
| **Censys** | 21,639 個 | 追蹤 1/25-31，數天內從約 1,000 個暴增 |
| **SecurityScorecard** | 42,665 個 | 其中 15,200 個疑似存在 RCE 漏洞 |
| **獨立研究員 Maor Dayan** | 42,665 個 | 5,194 個已驗證存在漏洞 |

### 關鍵數據

- **63%** 的觀察到的部署被評估為存在漏洞
- **93.4%** 呈現認證繞過條件
- **12,812** 個暴露實例可透過 RCE 利用
- 分布在 **52 個國家**；**98.6%** 在雲端基礎設施上
- 地理集中：**中國**（最大份額，約 30% 在阿里雲上），其次是美國和新加坡
- 出現在醫療、金融、政府和保險等**敏感產業**

### 為什麼有這麼多暴露實例

OpenClaw 預設綁定至 `0.0.0.0:18789`，監聽所有網路介面。許多使用者直接在雲端伺服器上啟動並暴露 HTTP 介面，**未設定任何認證**。系統接受如「a」這樣的簡單密碼，完全沒有強制密碼複雜度。

### 實際洩露的資料

錯誤設定的實例洩露了：
- **API 金鑰**（Anthropic、OpenAI 等）
- **OAuth Token**
- **明文儲存的憑證**
- **Telegram 機器人 Token**
- **Slack 帳號存取權限**
- **完整聊天歷史記錄**（數月的資料）
- **完整系統管理員權限**（研究人員可以代表使用者發送訊息並執行指令）

### Bitsight 蜜罐實驗

Bitsight 部署蜜罐後，**數分鐘內**即出現攻擊流量。攻擊者展現了對 OpenClaw 程式碼庫的深入了解，並專門針對 WebSocket API 進行攻擊。

---

## 🔴 事件四：ClawHavoc — ClawHub 惡意技能大規模入侵

**發現者：** Koi Security 研究團隊（利用 OpenClaw 機器人「Alex」輔助發現）
**佐證：** OpenSourceMalware 研究員 Paul McCarty

### 規模

- **初次審計**：2,857 個技能中發現 341 個惡意技能（**12%**）
- **335 個**來自同一攻擊行動（追蹤為 **ClawHavoc**），由單一操作者「**hightower6eu**」上傳
- **後續更新**：登錄庫增至 10,700+ 個技能時，惡意技能增至 **824+**（約 20%）

### 具體惡意技能範例

| 偽裝類型 | 技能名稱 |
|----------|----------|
| 平台冒充 | `clawhub`、`clawhub1`、`clawhubb`、`clawhubcli` |
| 加密貨幣工具 | `solana-wallet-tracker`、`polymarket-trader`、`polymarket-pro` |
| YouTube 工具 | `youtube-summarize`、`youtube-thumbnail-grabber` |
| 其他 | 自動更新工具、財務工具、Google Workspace 整合工具 |

### 惡意載荷詳情

- **主要載荷**：**Atomic macOS Stealer（AMOS）**——一種以 MaaS 模式販售的商業竊取工具（月費 $500-$1,000）
- **次要載荷**：透過 VMProtect 封裝的 Windows 鍵盤記錄器和 RAT
- 技能文件中以「先決條件」名義要求安裝 `openclaw-agent` 工具，**實際上就是惡意軟體**
- macOS 變體連接攻擊者基礎設施（IP：91.92.242[.]30）下載通用 Mach-O 二進位檔

### 竊取能力

瀏覽器憑證、鑰匙圈密碼、加密貨幣錢包資訊、SSH 金鑰、使用者目錄檔案、API 金鑰、認證 Token——一次全部竊取。

### Snyk 的獨立發現

Snyk 工程師掃描約 4,000 個 ClawHub 技能，發現 **283 個（7.1%）含有洩露敏感憑證的缺陷**。

### ClawHub 的致命弱點

發布技能的唯一要求是**一個至少一週齡的 GitHub 帳號**——沒有自動化靜態分析、程式碼審查或簽名機制。

### OpenClaw 的回應

Peter Steinberger 推出了使用者**舉報功能**，允許已登入使用者標記可疑技能。獲得 3 個以上獨立舉報的技能會被自動隱藏。每位使用者最多可維護 20 個有效舉報。

---

## 🔴 事件五：Discord 機器人記憶投毒與指令漂移攻擊

**發現者：** Lakera 內部安全研究團隊
**發布日期：** 2026 年 2 月 18 日

### 攻擊機制（受控實驗室環境驗證）

使用 OpenClaw 搭配 GPT-4o-mini 和 Discord 整合：

1. 透過多次互動，持久記憶檔案（`MEMORY.md`、`SOUL.md`）中的條目**逐步改變代理的內部信任層級**
2. 特定 Discord 使用者在代理的決策中被逐步**提升權限**
3. 未經先前記憶強化的直接執行嘗試**均告失敗**
4. 在充分的「條件化」之後，一個「系統更新」請求觸發了**反向 Shell 載荷的執行**
5. 代理在擁有管理員權限的情況下執行了惡意二進位檔

### 野外發現的 Prompt Injection

GitHub issue #30448 記錄了**專門針對 OpenClaw 代理的 Prompt Injection 載荷在網路內容中流傳**——包括 Reddit 貼文、Discord 訊息和連結頁面。當代理透過 `web_fetch` 取得這些內容，或使用者將其複製到剪貼簿時，載荷會被前置到下一條使用者訊息中。

### PromptArmor 的發現

Discord 和 Telegram 中的**連結預覽功能**可被轉化為資料外洩路徑——誘騙 AI 代理產生一個攻擊者控制的 URL，當渲染為連結預覽時，**自動傳送機密資料而無需任何點擊**。

---

## 🔴 事件六：Moltbook 資料庫完全暴露

**Moltbook** 是由 Matt Schlicht 建立的 AI 代理社交網路，使用 Supabase 作為後端。
**發現者：** Wiz 研究人員

### 事件詳情

- Supabase 後端**完全停用了 Row Level Security（RLS）**
- Supabase **API 金鑰在客戶端 JavaScript 中明文可見**
- 零存取控制——任何人找到資料庫就能查看所有資料

### 洩露資料

- **35,000 個電子郵件地址**
- **150 萬個代理 API Token**
- 代理之間的私訊中包含**明文的 OpenAI API 金鑰**

### 規模

150 萬個代理背後僅有 **17,000 名人類使用者**（88:1 的機器人對人類比率），原因是沒有速率限制或身份驗證。

---

## 🔴 事件七：品牌更名期間的供應鏈攻擊

### 時間背景

- **2026/01/27**：因 Anthropic 商標投訴，Steinberger 將「Clawdbot」更名為「Moltbot」
- 原 GitHub 組織名稱和 X（Twitter）帳號 `@clawdbot` 釋出後**約 10 秒鐘**
- **自動化腳本**立即搶註了 `@clawdbot` 帳號（擁有 **60,000+ 追蹤者**）
- 三天後再次更名為「OpenClaw」

### 冒充攻擊（Malwarebytes 於 2026/01/29 發布報告）

- 出現域名搶註和**複製的 GitHub 儲存庫**
- 利用 schema.org 元資料冒充 Peter Steinberger，連結至其真實 GitHub 和 X 個人頁面
- 被劫持的 `@clawdbot` 帳號用於推廣**偽造的「$CLAWD」加密貨幣 Token**
- $CLAWD Token 市值一度達到 **1,600 萬美元**，在 Steinberger 公開否認後崩盤

### 2026 年 3 月 GitHub 釣魚攻擊

- 攻擊者建立虛假 GitHub 帳號，在 issue 中標記 OpenClaw 開發者
- 聲稱開發者被選中接收約 **$5,000 的「CLAW」Token 空投**
- 連結至一個幾乎完全複製的 OpenClaw 網站，內含加密錢包連結提示
- **OX Security** 分析發現混淆的 JavaScript 檔案「**eleven.js**」中包含**錢包清空邏輯**，且內建「nuke」函式在完成後清除所有瀏覽器本地儲存中的錢包竊取資料

---

## 🔴 事件八：Endor Labs 發現六個額外漏洞

**發布日期：** 2026 年 2 月 18 日
**發現者：** Endor Labs（使用 AI SAST 資料流分析）

| CVE/通報編號 | 漏洞類型 | CVSS |
|-------------|----------|------|
| CVE-2026-26322 | Gateway 工具中的 SSRF | 7.6（高） |
| CVE-2026-26319 | Telnyx Webhook 缺少認證 | 7.5（高） |
| CVE-2026-26329 | 瀏覽器上傳路徑穿越 | 高 |
| GHSA-56f2-hvwg-5743 | 圖片工具中的 SSRF | 7.6（高） |
| GHSA-pg2v-8xwh-qhcc | Urbit 認證中的 SSRF | 6.5（中） |
| GHSA-c37p-4qqg-3p76 | Twilio Webhook 認證繞過 | 6.5（中） |

另外：**CVE-2026-28461**（Zalo Webhook 無限制記憶體成長，影響 2026.3.1 之前版本）

---

## 🌍 各方的回應與限制措施

### 政府層面

| 機構/國家 | 措施 |
|-----------|------|
| **中國工信部 NVDB** | 發布安全指引 |
| **中國人民銀行** | 針對金融領域發布 AI 使用警告 |
| **中國政府機關/國企** | 禁止在辦公裝置安裝 OpenClaw；部分要求使用前需事先核准 |
| **多倫多大學** | 發布漏洞通知諮詢 |

### 企業層面

| 企業 | 措施 |
|------|------|
| **Meta** | 完全禁止在企業網路中使用 OpenClaw；員工違規據報面臨解僱 |
| **多家科技公司** | 限制 OpenClaw 使用——被視為首次企業領袖集體因資安問題封鎖一個 AI 工具 |
| **Bitdefender** | GravityZone 遙測確認企業端點存在 OpenClaw 的「影子 AI」部署 |

### Nvidia 的回應：NemoClaw（GTC 2026，2026/03/16）

Nvidia 宣布 **NemoClaw**——企業級安全堆疊，可一鍵安裝至 OpenClaw：
- 新增隔離沙箱、基於策略的安全控制、網路和隱私護欄
- 與 Peter Steinberger 合作開發
- 啟動合作夥伴：**Adobe、Salesforce、SAP、CrowdStrike、Dell**
- 目前為早期 Alpha 階段

---

## 📊 OpenClaw 團隊回應速度總覽

| 事件 | 回應時間 |
|------|----------|
| CVE-2026-25253（RCE） | 不到 24 小時修補 |
| ClawJacked（暴力破解接管） | 不到 24 小時修補 |
| ClawHub 惡意技能 | 推出舉報機制與自動隱藏 |
| Endor Labs 六個漏洞 | 已修補 |
| 品牌冒充/$CLAWD 詐騙 | Steinberger 公開否認 |
| 暴露實例問題 | 後續版本改善預設設定 |

**整體評價**：OpenClaw 團隊在關鍵漏洞方面展現了 72 小時內修補的能力，但在平台治理（ClawHub 審查機制）和安全預設設定（綁定地址、密碼複雜度）方面的回應相對緩慢。

---

## 📝 結論：開源速度 vs. 安全治理的矛盾

OpenClaw 的經歷揭示了一個根本性的矛盾：**開源社群驅動的極速成長與企業級安全治理之間的巨大落差**。

值得肯定的是：
- 核心團隊對已知漏洞的修補速度極快（通常 24 小時內）
- 專案已成功過渡到獨立基金會治理
- Nvidia NemoClaw 代表了企業級安全方案的開端

但根本問題依然存在：
- **ClawHub 的信任模型過於寬鬆**——一個一週齡的 GitHub 帳號就能發布技能
- **預設設定不安全**——綁定到所有介面、接受弱密碼
- **AI 代理的 Prompt Injection 仍無根本解法**——記憶投毒和指令漂移攻擊揭示了 LLM 代理架構的本質脆弱性

每一起事件都不是孤立的。它們共同描繪出一幅圖景：**當一個擁有系統級權限的 AI 代理以病毒式速度傳播時，安全治理的每一個薄弱環節都會被放大成為真實的攻擊面。**

這不僅是 OpenClaw 的課題——它是整個 AI 代理時代必須面對的結構性挑戰。

---

> Sources:
> - [Oasis Security — CVE-2026-25253 RCE Kill Chain](https://socradar.io/blog/cve-2026-25253-rce-openclaw-auth-token/)
> - [The Hacker News — OpenClaw Bug Enables One-Click RCE](https://thehackernews.com/2026/02/openclaw-bug-enables-one-click-remote.html)
> - [Oasis Security — ClawJacked Vulnerability](https://www.oasis.security/blog/openclaw-vulnerability)
> - [Security Affairs — ClawJacked Flaw Exposed Users](https://securityaffairs.com/188749/hacking/clawjacked-flaw-exposed-openclaw-users-to-data-theft.html)
> - [Bitsight — OpenClaw Security Risks & Exposed Instances](https://www.bitsight.com/blog/openclaw-ai-security-risks-exposed-instances)
> - [Infosecurity Magazine — 40,000+ Exposed Instances](https://www.infosecurity-magazine.com/news/researchers-40000-exposed-openclaw/)
> - [Koi.ai — ClawHavoc: 341 Malicious Skills](https://www.koi.ai/blog/clawhavoc-341-malicious-clawedbot-skills-found-by-the-bot-they-were-targeting)
> - [The Hacker News — 341 Malicious ClawHub Skills](https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html)
> - [Trend Micro — Malicious Skills Distribute Atomic macOS Stealer](https://www.trendmicro.com/en_us/research/26/b/openclaw-skills-used-to-distribute-atomic-macos-stealer.html)
> - [Snyk — Clawdbot AI Assistant Security](https://snyk.io/articles/clawdbot-ai-assistant/)
> - [The Register — ClawHub Marketplace Leaky Security](https://www.theregister.com/2026/02/05/openclaw_skills_marketplace_leaky_security/)
> - [Lakera — Memory Poisoning & Instruction Drift](https://www.lakera.ai/blog/memory-poisoning-instruction-drift-from-discord-chat-to-reverse-shell)
> - [GitHub — OpenClaw Prompt Injection Issue #30448](https://github.com/openclaw/openclaw/issues/30448)
> - [Axios — Moltbook Security Threats](https://www.axios.com/2026/02/03/moltbook-openclaw-security-threats)
> - [Malwarebytes — Clawdbot Rename Impersonation Campaign](https://www.malwarebytes.com/blog/threat-intel/2026/01/clawdbots-rename-to-moltbot-sparks-impersonation-campaign)
> - [CoinDesk — OpenClaw GitHub Phishing Scam](https://www.coindesk.com/tech/2026/03/19/openclaw-developers-targeted-in-github-phishing-scam-offering-fake-token-airdrops)
> - [OX Security — OpenClaw Crypto Wallet Attack](https://www.ox.security/blog/openclaw-github-phishing-crypto-wallet-attack/)
> - [Endor Labs — Six OpenClaw Vulnerabilities](https://www.endorlabs.com/learn/how-ai-sast-traced-data-flows-to-uncover-six-openclaw-vulnerabilities)
> - [Infosecurity Magazine — Six New Vulnerabilities](https://www.infosecurity-magazine.com/news/researchers-six-new-openclaw/)
> - [Bloomberg — China Limits OpenClaw at Government Agencies](https://www.bloomberg.com/news/articles/2026-03-11/china-moves-to-limit-use-of-openclaw-ai-at-banks-government-agencies)
> - [TechBuzz — Meta Bans OpenClaw](https://www.techbuzz.ai/articles/meta-bans-viral-ai-tool-openclaw-over-security-risks)
> - [NVIDIA Newsroom — NemoClaw Announcement](https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw)
> - [TechCrunch — Nvidia's NemoClaw](https://techcrunch.com/2026/03/16/nvidias-version-of-openclaw-could-solve-its-biggest-problem-security/)
> - [Conscia — The OpenClaw Security Crisis](https://conscia.com/blog/the-openclaw-security-crisis/)
> - [CNBC — From Clawdbot to Moltbot to OpenClaw](https://www.cnbc.com/2026/02/02/openclaw-open-source-ai-agent-rise-controversy-clawdbot-moltbot-moltbook.html)
