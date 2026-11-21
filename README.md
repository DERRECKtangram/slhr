# 上力國際官網：SEO 與資安上線清單

## 一、上傳前必做（5 分鐘）

1. **網域**：已設定為 `https://slhrtw.com`（Cloudflare Workers 自訂網域，www.slhrtw.com 一併綁定）。
2. **放法規文件**：把以下三份 PDF 放進 `docs/`：
   - `fee-schedule.pdf`：收費項目及金額明細表
   - `license.pdf`：私立就業服務機構許可證
   - `specialist-cert.pdf`：就業服務專業人員證書
3. **填服務時間**：index.html 裡的 `[ 請填寫時段 ]`。
4. **接上試算表單**：表單目前送到 `/api/lead`，請換成你的後端或表單服務。換成外部網址（例如 Formspree）時，要把 CSP 裡的 `form-action 'self'` 一起加上該網域，不然表單會被擋住送不出去。
5. **客戶心得**：這個區塊已先註解起來。取得客戶同意的真實心得後，再取消註解放上去。

## 二、主機設定

網站部署在 Cloudflare Workers（專案 `slhr`），已連結本 GitHub repository，推送到 `main` 就會自動部署。資安標頭由 `_headers` 設定，HTTPS 憑證由 Cloudflare 自動配發。

## 三、資安檢測（目標 A 以上）

上線後用下面三個工具檢測：

- **Mozilla Observatory**（observatory.mozilla.org）：檢查資安標頭，目標 A+。
- **SSL Labs**（ssllabs.com/ssltest）：檢查 HTTPS 憑證與加密設定，目標 A 或 A+。
- **securityheaders.com**：快速檢查資安標頭，目標 A。

這套網站已經做好的資安設定：
- 全站強制 HTTPS，加上 HSTS。
- 內容安全政策（CSP）只允許自己網域和 Google 地圖、Google 字型，網頁沒有任何內嵌 JavaScript，可以防範 XSS 攻擊。
- 防止網站被別人用框架嵌入（Clickjacking）。
- 關閉目錄瀏覽，隱藏伺服器版本資訊，禁止存取 .env、備份檔等敏感檔案。
- 表單有防機器人欄位（honeypot）和格式驗證，並要求勾選個資告知同意（符合《個人資料保護法》）。
- 提供 security.txt，作為資安問題的通報窗口。
- 純靜態網站，沒有資料庫和 WordPress 外掛，可以被攻擊的地方最少。

表單後端請另外做好：伺服器端重新驗證輸入資料、限制送出頻率、全程用 HTTPS 傳輸，個資存放處也要設定存取權限。

## 四、讓 Google 快速收錄

1. **Google Search Console**（search.google.com/search-console）
   - 新增網域資源，用 DNS 驗證網站所有權。
   - 在「Sitemap」提交 `sitemap.xml`。
   - 用「網址審查」貼上首頁網址，按「要求建立索引」，通常幾天內就會被收錄。
2. **Google 商家檔案**（business.google.com）：認領「上力人力」這個地標，改成正式公司名稱，填入網址、電話、營業時間和照片。這是在地搜尋（例如「台中外勞仲介」）最有效的一步。
3. **Bing Webmaster Tools**：可以直接從 Search Console 匯入網站資料。
4. **外部連結**：在 FB 粉專、LINE 官方帳號介紹、104 公司頁、各縣市工業會或商會名錄等地方，都放上官網網址。
5. **檢測工具**：
   - 結構化資料：Rich Results Test（search.google.com/test/rich-results）
   - 網站速度：PageSpeed Insights（pagespeed.web.dev），手機版目標 90 分以上

## 五、這套網站已經做好的 SEO 設定

- **標題與描述**：Title 和 Meta Description 都含主要關鍵字，例如「台中外勞仲介」「工廠移工申請」「外籍勞工」「勞動部許可 3595」。
- **頁面結構**：語意化 HTML，H1 標題含地區和服務關鍵字，H2 依服務、流程、新制、常見問題分段。
- **結構化資料**：
  - EmploymentAgency（人力仲介業者）：含地址、電話、統編、許可證號。
  - FAQPage：六題常見問題。
  - WebSite：網站基本資訊。
- **網址設定**：Canonical 網址、robots.txt、sitemap.xml，以及強制導向 HTTPS 和 www 的 301 轉址，避免 Google 判定為重複內容。
- **分享預覽**：Open Graph 設定，貼到 LINE 或 FB 時會出現大圖預覽。
- **速度與手機版**：圖片轉成 WebP、主圖預先載入、地圖和 QR code 延後載入，手機版響應式排版，底部固定「撥打電話」和「加 LINE」按鈕。

## 六、接下來要持續做的 SEO

只有一頁的網站很難搶到很多關鍵字，建議每 1 到 2 週新增一篇文章頁（例如 `/news/2026-加薪換名額.html`），每次新增都要更新 sitemap.xml。文章題目可以參考：

- 2026 本勞加薪換移工名額怎麼算？
- 製造業 3K 級別與移工核配比率完整說明
- 外國技術人力（原中階技術人力）申請資格與流程
- 移工行蹤不明，雇主該怎麼通報？
- 印尼、越南、泰國、菲律賓移工怎麼選？

也可以替不同地區做專頁，例如「大肚外勞仲介」「龍井外勞仲介」「彰化外勞仲介」，搶各地區的在地搜尋。

## 七、廣告法規提醒

首頁上的「100+ 家」「98% 留任率」請保留可以佐證的紀錄。仲介業的廣告如果被認定不實，可能違反就業服務法。
