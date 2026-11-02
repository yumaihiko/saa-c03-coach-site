# 證書人 · AWS SAA-C03 溫書站

互動式靜態溫書網站：練習題、知識卡翻面、弱點／進度儀表板（localStorage）。專為 AWS Certified Solutions Architect – Associate (SAA-C03) 衝刺使用。

> **語言說明：** 介面標籤為繁體中文；題庫內容目前為英文（貼近官方風格）。中英對照教練題由「證書人」對話另外提供。

## 功能

- **練習題**：快速練習（20 題）、依主題、錯題重溫；即時回饋與解析
- **知識卡**：Anki Front/Back（自 MEMORY-CARDS）＋弱項精選卡（IAM Implicit Deny、ALB vs NLB、Aurora Serverless v2、Egress-only IGW、SnapStart）
- **進度**：各主題正確率、錯題庫、通過粗估、JSON 備份匯出／匯入
- **深色模式**、手機友善

## 本機預覽

```bash
cd saa-c03-coach-site
python3 -m http.server 8080
# 開啟 http://127.0.0.1:8080/
```

（勿用 `file://` 開啟，部分瀏覽器會擋模組／路徑。）

## GitHub Pages（Actions）

本 repo 含 `.github/workflows/deploy-pages.yml`：推送到 `main` 後自動用 `upload-pages-artifact` + `deploy-pages` 部署。

第一次請在 GitHub repo 設定：

1. **Settings → Pages → Build and deployment → Source: GitHub Actions**
2. 推送 `main`（或手動 Run workflow）
3. 網站網址約為：`https://<user>.github.io/<repo>/`

**Pages URL（部署後填入）：** `https://yumaihiko.github.io/<REPO_NAME>/`

## 授權與出處

- 本站程式碼：MIT
- **練習題**改編自 [ChathurangaVKD/AWS-Certified-Solutions-Architect-Associate-SAA-C03](https://github.com/ChathurangaVKD/AWS-Certified-Solutions-Architect-Associate-SAA-C03)（MIT）。請保留其授權聲明。
- 知識卡 Anki 區內容同樣來自該專案 `exam-reviews/quick-reference/MEMORY-CARDS.md`。
- 非 AWS 官方產品，與 Amazon Web Services 無隸屬或背書關係。

## 目錄

```
index.html
css/styles.css
js/app.js
js/questions.js      # 題庫
js/flashcards.js     # 知識卡
.github/workflows/deploy-pages.yml
.nojekyll
```
