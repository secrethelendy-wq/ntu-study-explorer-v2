# 臺大自習空間探索網站更新交付

日期：2026-10-12。以使用者從 GitHub 下載的最新版 ZIP 為唯一程式基準，修改其工作副本；沒有使用舊網站程式碼，也沒有 GitHub 提交或推送。

## 開啟本次版本

預覽網址：http://127.0.0.1:4180/ntu-study-explorer/

已用一般視窗 Chrome 開啟並保持本機伺服器運作。Codex 沙盒的其他執行環境可能無法存取同一 loopback；若內建瀏覽器連不上，請雙擊下述啟動檔，讓你的 Windows 啟動預覽。若工作階段結束或網址無法連線，進入本次專案資料夾 `outputs/ntu-study-explorer-updated`，雙擊 `啟動網站.cmd`，保持視窗開啟，再開啟它顯示的 HTTP 網址（預設 http://127.0.0.1:4173/ntu-study-explorer/）。若 4173 被其他舊預覽占用，可雙擊本次提供的 `預覽本次更新.cmd` 使用 4180。兩者均只需要 Node 與已建置 dist；請使用 HTTP 預覽互動底圖。

## 資料核對與差異

完整讀取新版 24 頁 PDF，逐筆核對第 8–22 頁全部 15 筆紀錄。空間 ID s01–s15 保持不變；名稱、席位分區/估算、安靜程度、空間型態、學生證、空調/風扇、飲食、進入方式、說明與記錄者均無實質變更。

| ID | 空間 | 舊來源頁 | 新頁 | 內容差異 |
| --- | --- | --- | --- | --- |
| s01 | 總圖書館–1F–多元共享區與輕閱讀區 | 1、2 | 8 | 插座措辭與光線欄位改為新版格式；結構化條件不變。 |
| s02 | 普通教學館–2F–開放空間 | 2、3 | 9 | 插座 6 席→未提供數量（null），明列連接通道位置；室內照明 unknown→none；明列正常討論。 |
| s03 | 綜合教學館–1F–學習開放空間 | 3、4 | 10 | 討論 not-prohibited→allowed，保留安靜附註；插座與光線原文更新。 |
| s04 | 綜合教學館–4~6F–開放空間 | 4、5 | 11 | 插座位置依新版寫為靠牆座位；討論及光線原文更新，仍為照明不充足；原始錯誤官方 URL 保留。 |
| s05 | 博雅教學館–1F–開放空間 | 6、7 | 12 | 插座約 24 席→未提供數量（null），保留窗邊位置；討論及光線原文更新。 |
| s06 | 管理學院一號館–1F–開放空間 | 7、8 | 13 | Metadata 內容不變；更新來源頁碼。 |
| s07 | 管理學院二號館–1F–開放空間 | 8、9、10、11 | 14 | Metadata 內容不變；更新來源頁碼。 |
| s08 | 第二活動中心–3F–沃斯空間 | 11、12 | 15 | Metadata 內容不變；更新來源頁碼。 |
| s09 | 中研院原子與分子科學研究所–2~3F–化學系圖書館 | 12、13 | 16 | Metadata 內容不變；更新來源頁碼。 |
| s10 | 萬才館–1~2F–法律學院圖書館 | 13、14 | 17 | Metadata 內容不變；更新來源頁碼。 |
| s11 | 共同教學館–3F–開放空間 | 15 | 18 | Metadata 內容不變；更新來源頁碼。 |
| s12 | 圖書資訊館–2F–圖資系實習圖書館 | 16 | 19 | Metadata 內容不變；更新來源頁碼。 |
| s13 | 社會科學院大樓–3F–開放空間 | 17 | 20 | Metadata 內容不變；更新來源頁碼。 |
| s14 | 社會科學院大樓–1~2F–辜振甫先生紀念圖書館 | 18 | 21 | Metadata 內容不變；更新來源頁碼。 |
| s15 | 新生教學館–1.5F–討論室 | 19 | 22 | Metadata 內容不變；更新來源頁碼。 |

18 張實際照片內容相同，因此全部保留既有較高品質檔案，未替換為其他照片。新版重壓縮／縮圖不算場景更新；普通教學館影像物件在新版 PDF 中經轉向後顯示，核對其 PDF 實際方向後確認為同一照片。照片來源頁碼更新；管理二號館 4 張照片都在新版第 14 頁。

新版表格照片格是實際影像，沒有文字值；raw.照片 改為空字串，仍保留 JSON 的第 13 個元件及完整 photos。原始文字的純換行、空白及 Unicode 相容字形不任意重寫；新版原文另存 records-24.json、tables.json、pdf-text.txt。每一個非照片原始欄位經正規化後皆與新版一致。逐欄 before/after 可見 docs/source/metadata-update-diff.json；照片核對可見 docs/source/photo-update-audit.json。

## 功能修改

- 面板使用 draftFilters 與已套用 filters 分離；底部明顯的「確定」按鈕固定顯示，按下才更新結果與圖釘，手機自動收合。
- 面板顯示已套用條件數與尚未套用的草稿。清除全部篩選同步重設草稿、已套用條件與搜尋。
- 三個快速條件立即套用，搜尋保持即時。快速條件只改其欄位，保留其他尚未套用的草稿並繼續標示狀態；帶電腦去包含 all 與 partial，排除 none，下拉選項亦能正確顯示此狀態。
- 原始 Metadata 的地點變成真正超連結，使用該筆完整 PDF 官方 URL、target="_blank" 與 rel="noopener noreferrer"；地點附註仍保留。
- 原始 Metadata 只隱藏照片文字列，其他 12 欄原格式、空間卡片照片、詳細頁照片切換與圖片檔案保留。
- 移除詳細頁內品質警告與相關圖示區塊；保留學生證、置物櫃、入口與場地外借等實用說明。移除不再使用的 Quality 元件，原 #/quality 持續為不存在頁面。
- 搜尋區下新增預設收合「空間篩選標準」，以七項原則及指定結語說明資料收錄標準；沒有新增搜尋條件。
- 保留版面、配色、排序、互動地圖、同棟群集、定位、比較與詳細頁。部署 workflow 與 /ntu-study-explorer/ base 未修改。

## 測試

正式建置、最終型別檢查、來源/照片/座標資料驗證通過；26 項單元測試與 30 項三尺寸瀏覽器測試全部通過。15 個詳細頁皆可開啟，原始地點連結與其他照片正常，品質警告及 Quality 入口皆不存在。真實 HTTP 首頁與 CSS/JS/照片正常；一般視窗 Chrome 顯示 16 張真實 OSM 圖磚，封鎖與 JavaScript 錯誤均為 0。詳細範圍及限制見 docs/TEST_REPORT.md。

## 需要確認

1. 綜合教學館 4–6F 第 11 頁原始 URL 仍指總圖（apKey 3）。依要求保留原值；網站圖釘仍是既有已核對的綜合教學館位置。若要修正官方 URL，需要更正後來源或使用者同意更正。
2. 普通教學館的「博雅教學管」原字仍保留；是否改成「館」由使用者決定。
3. 沃斯空間租借查詢仍是固定 2026-10-02，未擅自改為今天；若要更新查詢目的地，需要可靠新網址。

普通/博雅新的插座席位數缺漏已依新版設 null，不需要自行推測。其他未記載數值也維持未知。完整內部項目見 docs/PENDING.md，沒有顯示於網站。

## 本次修改檔案

以下為相對於最新版 ZIP 的變動；完整機器可讀清單在 docs/updated-file-changes.json。dist 為重新建置產物，node_modules 與測試執行暫存不列為程式修改。

- 修改：`README.md`
- 修改：`docs/DATA_MODEL.md`
- 修改：`docs/PENDING.md`
- 修改：`docs/TEST_REPORT.md`
- 新增：`docs/UPDATE_REPORT.md`
- 新增：`docs/source/metadata-update-diff.json`
- 修改：`docs/source/pdf-links.json`
- 修改：`docs/source/pdf-text.txt`
- 新增：`docs/source/photo-update-audit.json`
- 新增：`docs/source/records-24.json`
- 修改：`docs/source/source.pdf`
- 修改：`docs/source/tables.json`
- 新增：`docs/source/update-provenance.json`
- 新增：`docs/updated-browser-report.json`
- 新增：`docs/updated-desktop-criteria.png`
- 新增：`docs/updated-detail-s02.png`
- 新增：`docs/updated-file-changes.json`
- 新增：`docs/updated-home-live.png`
- 新增：`docs/updated-mobile-draft.png`
- 新增：`docs/updated-mobile-filter-panel.png`
- 新增：`docs/updated-test-summary.json`
- 修改：`scripts/validate-data.mjs`
- 修改：`src/App.tsx`
- 修改：`src/Detail.tsx`
- 修改：`src/Filters.tsx`
- 新增：`src/InclusionCriteria.tsx`
- 刪除未使用元件：`src/Quality.tsx`
- 修改：`src/SpaceCard.tsx`
- 修改：`src/data/spaces.json`
- 修改：`src/filter.ts`
- 修改：`src/styles.css`
- 修改：`tests/data.test.ts`
- 修改：`tests/e2e/explorer.spec.ts`
- 修改：`tests/filter.test.ts`
- 新增：`預覽本次更新.cmd`
