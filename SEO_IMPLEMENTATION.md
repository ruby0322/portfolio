# SEO 優化實施文檔

## 概述

本文檔詳細說明為顧寬証個人網站實施的完整 SEO 優化策略。

## 實施的 SEO 功能

### 1. 關鍵字策略 (`lib/seo-keywords.ts`)

擴展了超過 200+ 個相關關鍵字，涵蓋以下類別：

#### 個人品牌
- **名稱**: 顧寬証、James Ku、Kuan-Cheng Ku、Ruby、ruby0322
- **身份**: 台大資管、國立台灣大學資管系、NTU Information Management、大同高中

#### 軟體開發
- **角色**: 全端工程師、軟體工程師、Full Stack Developer、Web Developer
- **服務**: 程式發案、程式接案、軟體接案、網頁開發接案、架站服務
- **技能**: Next.js、React、TypeScript、Python、AI 應用開發、Docker、PostgreSQL

#### 教育與教學
- **角色**: 程式家教、Python 家教、網頁開發教學、AI 教學
- **經驗**: 台大助教、台大講師、資管系助教、資訊之芽講師
- **課程**: 網路服務程式設計、資料結構、深度學習應用、雲端原生開發

#### 攝影
- **角色**: 攝影師、業餘攝影師、棚拍攝影師、人像攝影師、影像總監
- **專案**: 台大藝術季攝影、Runway Show 攝影、台大資管營攝影
- **風格**: 人像攝影、時尚攝影、活動紀錄

#### 專業成就
- **獎項**: 台積電校園黑客松第二名、2025 臺灣數創大賞佳作
- **經驗**: 台灣微軟實習生、Microsoft ISD
- **專長**: AI 維護工具開發、Vertex AI、OpenAI API

#### 長尾關鍵字
- 台大資管全端工程師
- 台北程式家教推薦
- Next.js 專案接案
- AI 應用開發接案
- 台積電黑客松得獎者
- 台大藝術季攝影師
- 500 位學生教學經驗

### 2. Metadata 管理 (`lib/seo-metadata.ts`)

#### 功能
- **動態 Metadata 生成**: 為每個頁面和語言生成專屬的 metadata
- **Open Graph 標籤**: 完整的社交媒體分享預覽
- **Twitter Card**: 優化的 Twitter 分享卡片
- **語言替代標籤**: 自動生成 hreflang 標籤
- **Canonical URLs**: 避免重複內容問題
- **Robots 指令**: 控制搜尋引擎爬蟲行為

#### 頁面專屬 Metadata

**首頁 (Home)**
- 標題: 顧寬証 | 全端工程師 · 程式家教 · 攝影師
- 描述: 強調台大背景、微軟實習、教學經驗、技術專長
- 類型: Profile

**服務頁面 (Services)**
- 標題: 服務項目 - 軟體接案 · 程式家教 | 顧寬証
- 描述: 詳細說明提供的服務、技術能力、經驗
- 關鍵字: 聚焦服務相關關鍵字

**攝影頁面 (Photography)**
- 標題: 攝影作品 - 人像攝影 · 活動紀錄 | 顧寬証
- 描述: 攝影作品集、專案經驗
- 特色圖片: 使用攝影作品作為 OG 圖片

### 3. 結構化資料 (`lib/structured-data.ts`)

實施了完整的 Schema.org 結構化資料：

#### Person Schema
```json
{
  "@type": "Person",
  "name": "顧寬証",
  "jobTitle": ["Full-Stack Developer", "Programming Tutor", "Photographer"],
  "alumniOf": ["國立臺灣大學", "台北市立大同高級中學"],
  "worksFor": "Microsoft Taiwan",
  "knowsAbout": ["Full-Stack Development", "AI Application Development", ...],
  "award": ["TSMC IT CareerHack 2024 - 2nd Place", ...],
  "sameAs": [社交媒體連結]
}
```

#### Professional Service Schema
- 定義提供的專業服務
- 服務類型、價格、服務區域
- Offer Catalog 結構

#### Course Schema
- 程式教學課程資訊
- 教學主題、價格、語言

#### Website Schema
- 網站基本資訊
- 多語言支援標記
- 搜尋功能（預留）

#### Breadcrumb Schema
- 各頁面的麵包屑導航
- 幫助搜尋引擎理解網站結構

#### Photography Schema (CreativeWork)
- 攝影作品集資訊
- 作品範例
- 創作者資訊

### 4. Robots.txt (`app/robots.ts`)

```
User-agent: *
Allow: /
Disallow: /auth/
Disallow: /protected/
Sitemap: https://yourdomain.com/sitemap.xml
```

### 5. Sitemap.xml (`app/sitemap.ts`)

- **動態生成**: 自動為所有語言版本和路由生成 sitemap
- **多語言支援**: 包含 hreflang 替代標籤
- **優先級設定**:
  - 首頁: 1.0 (weekly)
  - 服務/攝影: 0.8 (monthly)
- **語言覆蓋**: zh-TW, zh-CN, en-US

### 6. 頁面優化

#### 首頁 (`app/[locale]/page.tsx`)
- ✅ 結構化資料 (Person + Organization + Website)
- ✅ 動態 metadata
- ✅ 多語言支援
- ✅ 語義化 HTML

#### 服務頁面 (`app/[locale]/services/page.tsx`)
- ✅ 結構化資料 (ProfessionalService + Course + Breadcrumb)
- ✅ 專屬 metadata
- ✅ 服務詳細資訊

#### 攝影頁面 (`app/[locale]/photography/`)
- ✅ 結構化資料 (CreativeWork + Breadcrumb)
- ✅ 專屬 metadata 與圖片
- ✅ 作品集展示優化

## 技術實施細節

### Metadata 生成流程

```typescript
// 1. 在 layout.tsx 或 page.tsx 中使用 generateMetadata
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getHomeMetadata(locale); // 或其他對應函數
}

// 2. Metadata 函數自動處理：
// - 多語言標題和描述
// - Open Graph 標籤
// - Twitter Card
// - 語言替代 URL
// - Canonical URL
// - Robots 指令
```

### 結構化資料注入

```typescript
// 在 page.tsx 中
const structuredData = [
  getPersonSchema(),
  getOrganizationSchema(),
  getWebsiteSchema(),
];

return (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={generateJsonLd(structuredData)}
    />
    {/* 頁面內容 */}
  </>
);
```

## SEO 檢查清單

### ✅ 已實施
- [x] 關鍵字研究與策略
- [x] 動態 metadata 生成
- [x] Open Graph 標籤
- [x] Twitter Card
- [x] 結構化資料 (Schema.org)
- [x] Robots.txt
- [x] Sitemap.xml
- [x] 多語言 hreflang 標籤
- [x] Canonical URLs
- [x] 語義化 HTML
- [x] 麵包屑導航結構化資料

### 🔄 建議後續優化
- [ ] Google Analytics 整合
- [ ] Google Search Console 驗證
- [ ] 圖片 alt 文字優化（需審查所有圖片）
- [ ] 頁面載入速度優化
- [ ] Core Web Vitals 優化
- [ ] 內部連結優化
- [ ] 外部反向連結建設
- [ ] 部落格內容建立（長尾關鍵字）
- [ ] 社交媒體整合
- [ ] 本地 SEO 優化（Google My Business）

## 使用方式

### 環境變數設定

在 `.env.local` 中設定（如果使用自訂網域）：

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

如果未設定，會自動使用 Vercel URL 或 localhost。

### 新增頁面的 SEO

1. **創建 Metadata 函數**（在 `lib/seo-metadata.ts`）:
```typescript
export function getNewPageMetadata(locale: Locale): Metadata {
  return generatePageMetadata({
    title: '頁面標題',
    titleEn: 'Page Title',
    description: '頁面描述',
    descriptionEn: 'Page Description',
    keywords: getPageKeywords('new-page'),
    path: `/path/to/new-page`,
    locale: locale,
  });
}
```

2. **在頁面中使用**:
```typescript
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getNewPageMetadata(locale);
}
```

3. **添加結構化資料**（如需要）:
```typescript
const structuredData = [
  // 相關的 Schema
];

return (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={generateJsonLd(structuredData)}
    />
    {/* 內容 */}
  </>
);
```

## 監控與維護

### 使用工具
1. **Google Search Console**: 監控搜尋表現、索引狀態
2. **Google Analytics**: 追蹤流量來源、使用者行為
3. **Lighthouse**: 檢查 SEO、效能、可訪問性
4. **Schema Markup Validator**: 驗證結構化資料

### 定期檢查
- 每月檢查 Search Console 的索引狀態
- 季度性關鍵字排名審查
- 定期更新內容和關鍵字策略
- 監控競爭對手 SEO 策略

## 預期效果

實施完整 SEO 後，預期可以達到：

1. **搜尋引擎可見度提升**
   - 在 Google 搜尋「台大資管全端工程師」、「台北程式家教」等關鍵字時出現
   - 品牌關鍵字（顧寬証、James Ku）的第一頁排名

2. **社交媒體分享優化**
   - 在 Facebook、LinkedIn、Twitter 分享時顯示專業的預覽卡片
   - 提升點擊率和專業形象

3. **搜尋結果增強**
   - Rich Snippets：在搜尋結果中顯示額外資訊（星級、價格等）
   - Knowledge Graph：可能出現在 Google 知識圖譜中

4. **本地搜尋優化**
   - 在「台北軟體工程師」、「台北程式家教」等本地搜尋中獲得更好排名

5. **長期流量成長**
   - 透過長尾關鍵字獲得持續的自然流量
   - 建立專業權威和線上存在感

## 技術支援

如需進一步優化或問題排查，請參考：
- [Next.js Metadata 文檔](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org 結構化資料](https://schema.org/)
- [Google 搜尋中心](https://developers.google.com/search)

---

**實施日期**: 2025年10月
**版本**: 1.0
**維護者**: 顧寬証 (James Ku)

