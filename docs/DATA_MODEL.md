# Metadata 資料模型

`src/data/spaces.json` 同時保存來源原文與可搜尋欄位。資料轉換不把現場觀察、估算或未知值提升為精確／即時事實。

| 原元件 | 正規化欄位 | 保存規則 |
| --- | --- | --- |
| 名稱 | `name`、`building`、`floor`、`title` | 完整名稱保留在 `name` 與 `raw.名稱`，只拆出建築與樓層供顯示／檢索 |
| 席位 | `seats.areas`、`minimum`、`maximum`、`estimated` | 分別保留樓層及區域；「約」與範圍單獨標記，合計為衍生值 |
| 插座 | `outlets.coverage`、`knownSeats`、`estimated`、`location`、`knownSeatRange` | 區分 all / partial / none；席位數是能使用插座的席位，並非插座孔數 |
| 安靜程度 | `quietness.level`、`noiseSources`、`discussion`、`discussionOriginal`、`note` | 高／中／低；討論分類另存，完整原句與附註保留 |
| 空間開放程度 | `openness` | 原始三種型態；型態定義仍保留於 raw |
| 是否需要學生證 | `studentCardRequired` | 依原文；抵押、刷卡或其他入館程序在進入方式與說明詳列 |
| 空調 | `climate.airConditioning`、`fan`、`note` | 空調與風扇分開，設備存在不代表正在運作 |
| 飲食 | `foodAllowed` | 依原文，沒有推測飲水例外 |
| 光線相關 | `lighting.indoorFixtures`、`indoorAdequacy`、`naturalLightAffected`、`independentLighting`、`independentSeats`、`independentScope` | 燈具、自然光與獨立照明分開；未知用 null，矛盾的充足度用 unknown |
| 地點 | `location` | 保留原始網址、apKey、EPSG:3857 視圖中心及轉換值；實際圖釘另存官方 WFS 衍生中心點 |
| 說明 | `description`、`externalLinks` | 原文全留；超連結註記與顯示文字有差異時，兩者均保留 |
| 記錄者 | `recorder` | 保存原姓名 |
| 照片 | `photos` | 真實 PDF 圖片、來源頁碼、圖片序號、SHA-256，不替代照片 |

`source.pages` 表示紀錄占用的 PDF 頁，`source.fieldPages` 表示各文字欄位的原始頁碼。照片還有自己的 `sourcePage`，不依照片所在頁的新紀錄名稱推測歸屬。

## 席位語意

總圖多元共享區約 60–70 席加輕閱讀區 36 席，合計顯示「約 96–106 席」；最低 100 席篩選不符合，因範圍較低值為 96。普通教學館約 32 席加連接通道 6 席，合計約 38 席，仍標記估算。綜合教學館 4／5／6 樓各 12 席，保留三個分區並衍生合計 36 席。

化學系及法律學院圖書館另外提及影印用電腦席位，不加入自習席位合計。沒有即時空位欄位。

## 插座與未知值

新版第 9 頁將普通教學館改為部分座位可使用插座，位置明列為連接通道；第 12 頁博雅改為部分窗邊座位可使用。新版已不提供兩處可用插座席位數，因此均將 knownSeats 設為 null；連接通道總席位 6 席不直接當作可用插座席位數。全部席位可用者可依紀錄席位推得範圍，但衍生依據明確標記，不當作原文直接提供的插座數。

部分插座未提供數量時 `knownSeats=null`；未記載獨立照明時 `independentLighting=null`。未知與 false 不可互換。新版普通教學館明確為無室內光源，因此 `indoorFixtures=false`，`indoorAdequacy=none`。

## 討論分類

- `allowed`：開放正常討論、能正常出聲討論、開放討論。
- `not-prohibited`：僅未明確禁止討論且未明列允許時使用；本次新版沒有符合此分類的紀錄。綜合教學館一樓明列開放正常討論，歸 allowed，原觀察仍保留在 note。
- `prohibited`：不開放討論。

原句均保留在 `discussionOriginal`，觀察附註放在 `note`。網站不因允許討論而改動安靜程度。

## 品質記錄

`qualityIssues` 記錄原文、問題、網站處理方式及相關空間 ID。全資料集問題的 `spaceIds=[]`。此結構僅供內部資料管理，網站不顯示品質警告。新版已釐清的照明與插座位置保留歷程並標示已釐清，不掛在空間的目前 issueIds。詳見 `PENDING.md`。


## 新版來源與原始呈現

全部 ID 保持 s01–s15。新版每筆紀錄各在第 8–22 頁；管理二四張照片都在第 14 頁。只更新內容不同的 raw 欄位；純排版換行、空白及 Unicode 相容字形不重寫，其原始新版形式另存 docs/source/records-24.json。照片在 PDF 表格以實際圖片呈現，沒有文字值，raw.照片 使用空字串但仍保留此元件；photos 陣列與 18 張照片保留。詳細頁只呈現另外 12 個文字元件。

完整官方 URL 同時與新版逐行文字及 PDF URI 超連結註記核對；連結不包含換行。綜合 4–6F 的原始 URL 仍沿用總圖，原值保留。圖釘沿用既有、獨立核對的 WFS 建築定位。
