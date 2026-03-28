# 太空資料中心：當 AI 的電力飢渴把算力推向軌道

## 從科幻變成工程問題——2026 年，人類第一次在太空訓練 AI

2025 年 12 月，一家名為 Starcloud 的公司完成了一件前所未有的事：在低地球軌道上用 NVIDIA H100 GPU 訓練了一個大語言模型。不是模擬，不是概念驗證，而是真正在距離地球 550 公里的太空中，用太陽能供電、用真空散熱、完成了 nanoGPT 的訓練。

這不再是科幻小說的情節。2026 年 1 月，Axiom Space 發射了首批兩個軌道資料中心節點。同月，SpaceX 向 FCC 提交了一份驚人的申請：部署最多**一百萬顆**軌道資料中心衛星。2 月，Starcloud 跟進申請 88,000 顆。中國的「三體計算星座」已發射首批 12 顆衛星，目標是建成 2,800 顆衛星組成的太空超級電腦。

2025 年，太空產業吸引了超過 **450 億美元**投資，較 2024 年的 250 億美元暴增 80%。太空資料中心從邊緣概念變成了大資本追逐的前沿賽道。

---

## 一、為什麼要把資料中心送上太空？

### 1.1 地球的電力困境

AI 的算力需求正在吞噬地球的電力供應。Goldman Sachs 預估 2026 年 AI 基礎設施資本支出超過 5,000 億美元，其中最大的瓶頸不是晶片，而是**電力**。美國的資料中心用電量預計 2026 年佔全國總用電量的 6-9%，到 2030 年可能超過 12%。

太空的解方令人心動：
- **太陽能效率高 5 倍以上**：在日同步軌道上，太陽能板幾乎 24 小時受光，且不受大氣層削弱，同面積發電量是地面的 5 倍以上
- **電力成本極低**：Starcloud 估算軌道太陽能的等效電力成本約 **$0.005/kWh**——是地面批發電價的 1/15
- **零碳排放**：不需要天然氣發電廠、不需要連接電網、純太陽能供電

### 1.2 免費的極致冷卻

地面資料中心的第二大成本是冷卻。一座大型資料中心每天消耗高達 **500 萬加侖**的水用於蒸發冷卻。在水資源日益緊張的全球環境下，這已成為政治和環保爭議的焦點。

太空的優勢是根本性的：
- 真空環境的有效溫度約 **-270°C**，是天然的巨型散熱器
- 使用被動式輻射冷卻，無需能源密集的冷凍機
- **零水消耗**——完全消除了地面資料中心最大的環保爭議

### 1.3 無限的擴展空間

地面資料中心面臨的另一個瓶頸是**土地和審批**。在人口稠密的地區（也就是用戶最多的地方），建設新的資料中心越來越困難——鄰避效應、電網容量限制、水資源審批動輒需要 2-5 年。

太空沒有這些限制。理論上，軌道資料中心可以無限擴展，不需要土地購置、不需要環評審批、不需要與當地社區協商。

---

## 二、關鍵玩家與技術路線

### 2.1 Starcloud（前 Lumen Orbit）

| 項目 | 詳情 |
|------|------|
| 成立 | 2024 年 1 月，加州 El Segundo |
| 創辦人 | Philip Johnston（前 McKinsey）、Adi Oltean（前 SpaceX/Azure）、Ezra Feilden（前 Airbus） |
| 融資 | ~$3,400 萬種子輪（NVIDIA 背書） |
| 里程碑 | 2025/12 首次在太空訓練 LLM（nanoGPT）、首次在太空運行 Gemini（Gemma） |
| 目標 | 5 GW 軌道資料中心，太陽能/散熱板約 4 公里見方 |
| FCC 申請 | 88,000 顆衛星星座（2026/02） |
| 下一步 | 2026/10 發射 Starcloud-2，搭載 NVIDIA Blackwell 平台 |

Starcloud 的技術路線是**把商用 GPU 送上太空**，而非使用昂貴的航太級晶片。他們的核心創新在於：用軟體層面的錯誤校正和冗餘設計，取代硬體層面的抗輻射加固。

值得一提的花絮：Starcloud 在 2026 年 3 月宣布，他們的 Starcloud-2 衛星將搭載比特幣挖礦 ASIC——成為第一個在太空挖礦的組織。

### 2.2 SpaceX

SpaceX 在 2026 年 1 月向 FCC 提交了一份前所未有的申請：部署最多**一百萬顆**軌道資料中心衛星。申請書稱這將「運營一個具有前所未有運算能力的衛星星座，為先進 AI 模型及其應用提供動力。」

SpaceX 的優勢在於**垂直整合**：
- Falcon 9 / Starship 的發射成本是業界最低
- Starlink 的通訊網路已覆蓋全球
- 星艦（Starship）的貨運能力可大幅降低每公斤發射成本

### 2.3 中國「三體計算星座」

中國在 2025 年 5 月發射了「三體計算星座」的首批 12 顆衛星，計劃總數達 2,800 顆。星座特點：
- 衛星間透過**雷射通訊**連接
- 完成後運算能力達 **1,000 POPS**（petaOPS/秒）
- 目標是建成太空中的超級電腦

### 2.4 Axiom Space

2026 年 1 月 11 日，Axiom Space 成功發射首批兩個軌道資料中心節點至低地球軌道。2026 年 2 月獲得 3.5 億美元融資。目標是 2030 年前將軌道運算能力從千瓦級擴展至百萬瓦級。

---

## 三、技術挑戰：太空不是天堂

### 3.1 輻射

低地球軌道的輻射環境遠比地面惡劣。高能粒子可導致：
- **單事件翻轉（SEU）**：隨機翻轉記憶體位元，導致計算錯誤
- **累積損傷**：長期輻射使晶片效能逐年衰退，商用 GPU 壽命約 5-6 年即需更換

Starcloud 的策略是用軟體層的 ECC（錯誤校正碼）和冗餘計算來應對，而非使用昂貴 10 倍的航太級晶片。

### 3.2 散熱板的質量問題

太空中散熱靠輻射，而非對流。這需要**巨大的散熱板**——NASA 研究顯示，在高功率場景下，散熱板可佔總系統質量的 **40% 以上**。這意味著大量質量需要用火箭送上軌道，直接推高成本。

### 3.3 太空碎片

太空碎片是真正的生存威脅：
- 一片以 10 km/s 飛行的油漆碎片就能刺穿散熱管
- 5mm 碎片可切斷電力線束
- 太陽能板和散熱板的大面積幾乎**必然**會在運行期間被小碎片擊中

更多的軌道硬體 = 更多的潛在碎片 = 更高的碰撞風險。這是一個自我強化的負反饋循環。

### 3.4 延遲

軌道資料中心的地面通訊延遲約 **20-50 毫秒**，遠高於地面資料中心的 1-10 毫秒。這使得太空資料中心**不適合**延遲敏感的應用（如即時交易、遊戲、視訊通話），更適合**批次處理**場景（如 AI 模型訓練、科學計算、大數據分析）。

### 3.5 成本現實

Google 的 Suncatcher 團隊估算，發射成本需要降至每公斤 **$200 以下**（目標 2035 年），太空資料中心才能真正具備經濟競爭力。目前的發射成本約 $2,000-4,000/kg（SpaceX Falcon 9），即使 Starship 能降至 $500/kg，仍有距離。

保守估計，軌道資料中心的總體成本約為同等地面設施的 **3 倍**。

---

## 四、這對 AI 產業意味著什麼？

### 4.1 AI 訓練的電力天花板正在逼近

GPT-5.4 的訓練據估消耗了超過 50 GWh 的電力——相當於一座小城市一年的用電量。下一代模型的電力需求只會更高。如果地面電力供應跟不上 AI 的胃口，太空可能是唯一的出路。

### 4.2 新的地緣政治維度

太空資料中心不受任何單一國家的司法管轄。這創造了有趣的可能性：
- **數據主權問題**：儲存在太空的數據屬於誰？適用哪國法律？
- **軍事應用**：太空運算能力對國防情報有戰略價值
- **制裁規避**：理論上，太空資料中心可以繞過地面的技術出口管制

SpaceX 和中國同時大舉押注太空運算，背後的地緣政治動機不言而喻。

### 4.3 環保敘事的轉變

AI 產業目前面臨嚴峻的 ESG 壓力——用電量暴增、水消耗飆升、碳排放居高不下。太空資料中心提供了一個誘人的敘事轉換：「我們的 AI 訓練是 100% 太陽能、零水消耗、零碳排放。」

但批評者指出，火箭發射本身的碳排放和太空碎片的環境影響，使得「太空更環保」的說法仍有爭議。

---

## 五、台灣觀點

1. **TSMC 正在佈局太空晶片**：台積電已成立太空晶片部門，服務衛星星座和月球任務。當軌道資料中心從概念走向量產，對抗輻射加固晶片和高效能太空級處理器的需求將爆發。台灣的半導體製造能力在這個新市場中具有天然優勢。

2. **台灣衛星產業正從零件供應商轉向系統整合商**：2025 年福衛八號 A 成功發射，台灣太空中心正在台南建設火箭研發中心。太空資料中心的興起為台灣的太空產業鏈提供了新的商業場景——不只是造衛星，而是為軌道運算提供關鍵零組件。

3. **450 億美元的太空投資潮對台灣供應鏈是機會**：台灣已是全球 AI 伺服器組裝的樞紐，當 AI 算力從地面延伸到太空，台灣的 PCB、散熱模組、電源管理 IC 等供應鏈同樣可以「跟著上太空」。

4. **數據主權問題需要台灣政策制定者關注**：當資料儲存在太空時，傳統的數據在地化法規將面臨根本性挑戰。台灣正在制定的個資法修訂應考慮「太空數據」這個新維度。

5. **太空碎片風險是台灣衛星產業的隱形威脅**：SpaceX 申請百萬顆衛星、Starcloud 申請 8.8 萬顆、中國計劃 2,800 顆——如果這些計劃全部實現，低地球軌道的碎片密度將大幅增加，直接威脅台灣現有和未來的衛星資產。

---

> Sources:
> - [Space-based data center — Wikipedia](https://en.wikipedia.org/wiki/Space-based_data_center)
> - [Starcloud trains first AI model in space — CNBC](https://www.cnbc.com/2025/12/10/nvidia-backed-starcloud-trains-first-ai-model-in-space-orbital-data-centers.html)
> - [SpaceX files for million satellite orbital AI data center — DCD](https://www.datacenterdynamics.com/en/news/spacex-files-for-million-satellite-orbital-ai-data-center-megaconstellation/)
> - [How data centres in space enable the AI age — World Economic Forum](https://www.weforum.org/stories/2026/01/data-centres-space-ai-revolution/)
> - [Space-Based Data Centers Could Power AI with Solar Energy — Scientific American](https://www.scientificamerican.com/article/data-centers-in-space/)
> - [Data Centers on Orbit — National Defense Magazine](https://www.nationaldefensemagazine.org/articles/2026/3/25/data-centers-in-space)
> - [From satellites to space data centers — CNBC](https://www.cnbc.com/2026/03/22/why-low-earth-orbit-is-attracting-billions-in-investment.html)
> - [How Starcloud Is Bringing Data Centers to Space — NVIDIA Blog](https://blogs.nvidia.com/blog/starcloud/)
> - [Starcloud — Wikipedia](https://en.wikipedia.org/wiki/Starcloud)
> - [Axiom Space Orbital Data Centers](https://www.axiomspace.com/orbital-data-center)
> - [Musk data center megaconstellation — Astronomy.com](https://www.astronomy.com/science/musk-sets-sights-on-data-center-megaconstellation-but-is-it-possible/)
> - [Are Data Centers in Space Feasible? Bottlenecks — Intelligent Living](https://www.intelligentliving.co/data-centers-space-starcloud-bottlenecks/)
> - [How Stupid Would It Be? — IEEE Spectrum](https://spectrum.ieee.org/orbital-data-centers)
> - [Cost strategies for space data centers — SpaceNews](https://spacenews.com/beyond-the-horizon-cost-driven-strategies-for-space-based-data-centers/)
> - [Taiwan applies chip prowess to satellite — Digitimes](https://www.digitimes.com/news/a20251117PD216/taiwan-taiwan-space-agency-manufacturing-launch-design.html)
> - [Realities of Space-Based Compute — Per Aspera](https://www.peraspera.us/realities-of-space-based-compute/)
