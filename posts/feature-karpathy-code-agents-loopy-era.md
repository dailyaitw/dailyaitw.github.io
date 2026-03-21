# Andrej Karpathy 深度訪談：Code Agent、AutoResearch 與 AI 的「Loopy 時代」

> 2026-03-28

前 OpenAI/Tesla AI 主管 Andrej Karpathy 在 No Priors Podcast 深度對談——從「Vibe Coding」進化到「Agentic Engineering」、630 行程式碼的 AutoResearch 如何一夜跑完 700 個實驗、以及為什麼「所有可驗證的領域終將屬於機器」。

---

# Andrej Karpathy 深度訪談：Code Agent、AutoResearch 與 AI 的「Loopy 時代」

---

## 一、從 Vibe Coding 到 Agentic Engineering

2025 年，Andrej Karpathy 創造了「Vibe Coding」一詞，描述任何人只要用自然語言描述需求就能得到可運作的軟體。一年後，他宣布這個詞已經過時了。

**2026 年的新範式叫做「Agentic Engineering」。**

> 「人類不再寫大部分的程式碼。我們指揮、監督和編排 Agent。」——Karpathy

他坦承自己從 2025 年 12 月以後就「幾乎沒有親手寫過一行程式碼」。他的寫程式與委派比例從 80/20 翻轉成了 20/80。Claude Code、OpenAI Codex 等 AI 編碼工具在 2025 年底跨越了一個「連貫性門檻」（coherence threshold），從此改變了一切。

### 從「寫程式」到「編排 Agent」

| 時代 | 核心活動 | 人類角色 | 代表工具 |
|------|---------|---------|---------|
| **傳統程式設計** | 人類逐行編寫程式碼 | 執行者 | IDE、Git |
| **Vibe Coding (2025)** | 用自然語言描述需求 | 描述者 | Cursor、Copilot |
| **Agentic Engineering (2026)** | 編排多個 AI Agent 協同工作 | 監督者/編排者 | Claude Code、Agent IDE |

Karpathy 的日常工作流已經變成：開啟 tmux 網格，同時運行多個 Agent，建立 watcher 腳本讓它們持續循環，並且正在原型化一個「Agent 指揮中心 IDE」。

> 「舊的單檔案 IDE 已經死了。新的工作單位是 Agent 團隊。」

---

## 二、AutoResearch：630 行程式碼改變 AI 研究

Karpathy 在 2026 年 3 月開源了 **AutoResearch**——一個僅 630 行 Python 的工具，讓 AI Agent 在單張 GPU 上自主進行機器學習實驗。

### 運作原理

1. 你提供一個 `program.md` 檔案（用 Markdown 描述研究目標和約束）
2. AI Agent 讀取訓練腳本（`train.py`）的原始碼
3. Agent 形成改進假說（如調整學習率或架構深度）
4. 修改程式碼、執行實驗（固定 5 分鐘 GPU 時間）
5. 評估結果、記錄發現
6. 回到步驟 3，持續循環

### 驚人的實驗結果

| 指標 | 數據 |
|------|------|
| 實驗次數 | 2 天內 **700 個實驗** |
| 發現的優化 | **20 項**改進訓練效能 |
| 每小時實驗數 | 約 12 個 |
| 過夜可完成 | 約 100 個實驗 |
| 程式碼量 | 僅 630 行 Python |
| 硬體需求 | 單張 GPU |

### 真實世界驗證

Shopify CEO Tobi Lütke 將 AutoResearch 指向一個 8 億參數的內部模型。經過一夜 37 個實驗，Agent 達成了 **19% 的模型品質提升**——超越了人類研究員數週的手動調整。

更令人驚訝的是，Agent 發現了 Karpathy 20 年深度學習經驗都沒有注意到的參數交互作用，包括 **重新排列 QK Norm 和 RoPE 的順序**等新穎的架構調整。

> 「有客觀標準的事情，你只需要設定好然後讓它永遠跑下去。」——Karpathy

---

## 三、核心論點：可驗證性分界線

這次訪談最重要的觀點是 Karpathy 提出的**「可驗證性分界線」**：

> **「所有不可驗證的領域仍屬於人類；所有可驗證的領域要嘛已經屬於機器，要嘛很快就會。」**

### 這條線劃在哪裡？

| 可驗證（機器擅長） | 不可驗證（人類擅長） |
|-------------------|-------------------|
| 超參數最佳化 | 判斷哪個研究方向值得追求 |
| 程式碼正確性（有測試） | 產品設計的品味和直覺 |
| 數學證明 | 說笑話（AI 表現仍「參差不齊」） |
| 訓練損失最小化 | 人際關係的微妙拿捏 |
| 棋類遊戲 | 跨領域的概念性突破 |

### 遞歸的弔詭

最令人不安的是：**OpenAI 的研究員正在「積極自動化自己的工作」**。這是一個遞歸問題——AI 研究員用 AI 來取代 AI 研究員——結果尚不確定。

---

## 四、MicroGPT：為人類和 AI 都能理解的 AI

2026 年 2 月，Karpathy 發布了 **MicroGPT**——一個僅用 243 行純 Python（加上基礎數學，不需 PyTorch）就能從零訓練 GPT 模型的實作。

這是 nanoGPT 和 llm.c 的精神後繼者，但目標完全不同：

> 「目的是去神秘化這個演算法，讓人類和未來的 Agent 都能理解和擴展它。」

這呼應了他的教育理念轉變：

- **過去**：Karpathy 製作影片向人類解釋概念
- **現在**：他向 AI Agent 解釋概念，Agent 再根據每個人的程度調整解釋方式

> 「我不再向人們解釋事情了。我向 Agent 解釋事情。」

---

## 五、軟體架構的未來：App 消失，API 永存

Karpathy 預測一個根本性的轉變：**應用程式將消失，API 將激增。**

智慧 Agent 將成為連接所有服務的「黏合劑」，使用自然語言而非專屬介面。他用自己的智慧家庭系統「Dobby」做示範：

- **之前**：6 個獨立的 App（Sonos、Philips Hue、Nest、Ring 等）
- **之後**：3 句文字提示，Agent 自動掃描無線網路、識別智慧設備、整合成統一儀表板

### LLM 應用層架構

Karpathy 對 Cursor 等工具的分析揭示了 LLM 應用的四層架構：

1. **情境工程**（Context Engineering）：提供正確的上下文
2. **多次 LLM 呼叫編排**：將呼叫組合成複雜工作流，優化效能和成本
3. **產業特定 GUI**：針對特定領域的介面設計
4. **自主性滑桿**：讓使用者控制 Agent 的自主程度

> 「基礎 LLM 實驗室將訓練出能力等同大學畢業生的通才模型。專業 LLM 應用則會組織、微調這些模型，通過提供私有數據、感測器、執行器和反饋迴路，將它們部署為特定垂直領域的專業人員。」

---

## 六、就業的 Jevons 悖論

面對「AI 會取代工作嗎？」這個問題，Karpathy 提出了一個反直覺的觀點——**Jevons 悖論**：

> 當某種能力變得更便宜，需求通常會增加而非減少。

他舉了 ATM 的例子：ATM 看似會取代銀行出納員，但實際上讓開設新分行的成本降低，結果出納員的就業反而增加了。

同樣地，軟體工程可能因自動化而看到更多機會——因為軟體成本大幅降低後，更多領域會需要軟體解決方案。

**但他也承認這有限度**：當 AI 研究員都在自動化自己的工作時，長期結果確實不確定。

---

## 七、Karpathy 的焦慮與自省

這次訪談最打動人的部分，是 Karpathy 罕見地展現了脆弱面：

> 「我正在經歷一種 『AI 精神病態』（AI psychopathy）——焦慮與興奮交織，從 2025 年 12 月開始。」

他說自己的手動編碼技能正在「萎縮」，因為 Agent 的能力已經跨過了一個門檻。這不是一個初學者的焦慮——而是一個擁有 20 年深度學習經驗、曾領導 Tesla AI 和 OpenAI 的人的自我反思。

### 他認為仍然需要人類的地方

1. **概念性突破**：Micrograd 那種將神經網路濃縮到 200 行的精華蒸餾，Agent 目前還做不到
2. **價值判斷**：決定哪個研究方向值得追求
3. **約束導航**：AI 系統仍然「參差不齊」——在狹窄領域天才般出色，在其他地方卻像孩子

---

## 八、開源與模型多樣性

Karpathy 對開源 AI 持樂觀態度：

- 開源與閉源模型的差距已縮小至 **6-8 個月**
- 他倡導建立類似 Linux 的開源 AI 平台
- 當前的「模型單一文化」可能不是最佳方案
- 「物種分化」——專門化的模型——可能比通才模型更有效

> 「公共基礎設施比專有壟斷提供更健康的產業平衡。」

---

## 九、對台灣的啟示

### 9.1 對軟體工程師的意義

- **Agentic Engineering 是新的必備技能**：不是學更多程式語言，而是學會編排 Agent
- **手動編碼會像打字一樣**：基本功仍需要，但不再是主要產出方式
- **台灣的半導體人才有獨特機會**：AutoResearch 目前聚焦於軟體實驗，但硬體/晶片設計的 AI Agent 化是下一步

### 9.2 對研究人員的意義

- **AutoResearch 降低了研究門檻**：一張 GPU + 630 行程式碼就能跑自主研究
- **台灣的大學和研究機構應立即導入**：單 GPU 實驗成本極低，非常適合資源有限的學術環境
- **「可驗證領域屬於機器」**：研究人員應把時間花在不可驗證的概念性思考上

### 9.3 對企業的意義

- **Shopify 的 19% 模型改進案例是範本**：台灣企業可以用 AutoResearch 在內部模型上做自主優化
- **App 消失、API 永存**：軟體公司應該優先建 API，而不是 App
- **Jevons 悖論給了希望**：軟體工程需求可能不會減少，反而因成本降低而增加

---

## 結論：歡迎來到 Loopy 時代

Karpathy 所描繪的未來不是「AI 取代人類」的簡單敘事，而是一個更微妙的圖景：

**AI 進入了一個自我迴圈改進的「Loopy 時代」**——Agent 不斷循環、實驗、學習、改進，人類的角色從「執行者」變成「監督者」和「方向設定者」。

這個時代最重要的技能不是寫程式碼，而是：
1. **知道要問什麼問題**（研究方向設定）
2. **知道如何編排 Agent**（Agentic Engineering）
3. **知道何時介入**（在 AI 的「參差不齊」之處補位）

正如 Karpathy 所說：這不是一個讓人放鬆的時代，甚至連他自己都感到焦慮。但這也是人類歷史上最激動人心的時刻之一——**機器開始能夠自己做研究了**。

---

> Sources:
> - [Andrej Karpathy on Code Agents, AutoResearch, and the Loopy Era of AI — No Priors Podcast (YouTube)](https://youtu.be/kwSVtQ7dziU)
> - [Why everyone is talking about Karpathy's autonomous AI research agent — Fortune](https://fortune.com/2026/03/17/andrej-karpathy-loop-autonomous-ai-agents-future/)
> - [Karpathy's AutoResearch: 630-line Python script ran 700 experiments — NextBigFuture](https://www.nextbigfuture.com/2026/03/andrej-karpathy-on-code-agents-autoresearch-and-the-self-improvement-loopy-era-of-ai.html)
> - [Vibe coding is passé — The New Stack](https://thenewstack.io/vibe-coding-is-passe/)
> - [Karpathy's AutoResearch open-sourced — VentureBeat](https://venturebeat.com/technology/andrej-karpathys-new-open-source-autoresearch-lets-you-run-hundreds-of-ai)
> - [Karpathy interview: AI addiction, verifiable fields — Longbridge](https://longbridge.com/en/news/280013354)
> - [AutoResearch GitHub — karpathy/autoresearch](https://github.com/karpathy/autoresearch)
> - [Karpathy's AutoResearch: 630-line tool — MarkTechPost](https://www.marktechpost.com/2026/03/08/andrej-karpathy-open-sources-autoresearch-a-630-line-python-tool-letting-ai-agents-run-autonomous-ml-experiments-on-single-gpus/)
