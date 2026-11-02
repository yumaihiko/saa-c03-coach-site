# 證書人 · AWS SAA-C03 溫書站

互動式靜態溫書網站：中英語言切換（類似真考）、練習題、知識卡、弱點追蹤、一鍵複製進度給證書人。專為 AWS Certified Solutions Architect – Associate (SAA-C03) 衝刺使用。

**Live:** https://yumaihiko.github.io/saa-c03-coach-site/

## 功能

- **中英切換**：右上角 `中 / EN`（答題時也可按 `L`）。介面與雙語題幹／選項／解析會切換；題庫若無 `q_zh` 則顯示英文並提示。
- **練習題**：快速 20 題、依主題、錯題重溫、**雙語教練題**（證書人原創情境 MCQ）
- **弱點看板**：錯題依主題累積（localStorage）；可從進度頁重溫
- **複製給證書人**：進度頁一鍵複製 Markdown／JSON，貼回聊天即可針對弱點出題
- **知識卡**：Anki Front/Back ＋弱項精選；深色模式；手機底欄導覽

## 題庫 schema（給教練灌題）

在 `js/questions-bilingual.js` 新增物件（會與 `questions.js` 合併，同 `id` 以雙語檔為準）：

```js
{
  id: "coach-xxx",
  q: "English stem...",
  q_zh: "中文題幹...",
  options: { A: "...", B: "...", C: "...", D: "..." },
  options_zh: { A: "...", B: "...", C: "...", D: "..." },
  answer: ["B"],
  explanation: "...",
  explanation_zh: "...",
  why: ["..."],
  why_zh: ["..."],
  module: "IAM",
  multi: false,
  source: "coach"
}
```

題目為原創 SAA 情境風格，**不是**考試 dump。

## 本機預覽

```bash
cd saa-c03-coach-site
python3 -m http.server 8080
# http://127.0.0.1:8080/
```

## GitHub Pages

`.github/workflows/deploy-pages.yml`：推送 `main` 後自動部署。

Settings → Pages → Source: **GitHub Actions**。

## 授權

- 本站程式碼：MIT
- 練習題改編自 [ChathurangaVKD/AWS-Certified-Solutions-Architect-Associate-SAA-C03](https://github.com/ChathurangaVKD/AWS-Certified-Solutions-Architect-Associate-SAA-C03)（MIT）
- 知識卡 Anki 區來自該專案 `MEMORY-CARDS.md`
- 非 AWS 官方產品

## 目錄

```
index.html
css/styles.css
js/app.js
js/questions.js              # EN bank (~298)
js/questions-bilingual.js    # coach ZH+EN starter set
js/flashcards.js
.github/workflows/deploy-pages.yml
```
