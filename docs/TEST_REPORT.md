# 2026-10-12 新版 PDF 與功能更新測試

基準：使用者提供的最新版 GitHub ZIP。未提交或推送 GitHub。

| 檢查 | 結果 |
| --- | --- |
| 正式建置 `npm run build` | 通過，包含 TypeScript 與 Vite |
| 最終型別檢查 `tsc -b` | 通過，包含更新後測試 |
| `npm run validate:data` | 通過，15 筆、原始 13 欄位、18 張照片 SHA-256、13 棟 WFS 建築 |
| 新版 PDF 原文對照 | 15 筆均吻合獨立擷取的 records-24.json，僅忽略排版空白與 Unicode 相容字形 |
| 原始官方地圖 URL | 15 筆均吻合該頁完整 PDF URI 註記，無換行截斷 |
| Vitest | 26/26 通過 |
| Playwright 桌面、平板、手機 | 每種 10/10，共 30/30 通過 |
| 真實 HTTP 資源 | 首頁、帶子路徑的 CSS／JS／照片皆 HTTP 200 |
| 真實 OSM 首頁 | 16 張圖磚完整繪製，x-blocked/4xx 為 0，JS 錯誤 0 |
| 維持原功能與檔案 | 18 張照片、CampusMap、Compare、mapTiles、Vite base、部署 workflow 及套件鎖定檔位元組不變 |

瀏覽器涵蓋：全部 15 筆詳細頁、12 個原始文字元件、照片、完整地點連結 target/rel 與新分頁實際點擊、無品質警告、草稿確認才更新、即時搜尋與三個快速條件、帶電腦去 all+partial、清除同步、地圖群集/定位/拖曳/縮放、比較與 Escape、七項收錄標準、Quality 原網址不可進入、file:// 不發送缺少來源的 OSM 請求、三尺寸不溢位。

功能回歸的自動拖曳與縮放使用測試用 SVG 圖磚，避免對 OSM 反覆掃描。真實底圖以一般視窗 Chrome、實際 HTTP 伺服器、單次正常首頁瀏覽另外驗證，沒有 request routing、User-Agent/Referer 覆寫或停用快取。實際官方地圖外站的所有目的頁沒有逐頁連線驗證；完整原始 href 已核對 PDF，新分頁點擊測試使用本機測試回應。

平板與手機為 Chrome 裝置模擬。底圖需要網路，未驗證其他瀏覽器引擎及實體裝置。真實底圖證據：updated-browser-report.json；測試摘要：updated-test-summary.json；完整自動瀏覽器結果：test-results/results.json。
