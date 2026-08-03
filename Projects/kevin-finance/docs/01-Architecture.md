# Kevin Finance Architecture

> Last Updated: 2026-08-03

---

# 專案目標

Kevin Finance 是一套個人投資與記帳管理系統。

主要功能：

- ETF 管理
- 股票管理
- 配息統計
- 記帳
- Dashboard
- 報表分析

---

# 系統架構

```
Next.js App Router
       │
       ▼
Server Component
       │
       ▼
Client Component
       │
       ▼
UI Components
```

---

# 資料夾架構

```
src
│
├── app
├── components
│   ├── investment
│   ├── accounting
│   ├── dashboard
│   └── ui
│
├── lib
├── hooks
├── utils
├── types
└── prisma (future)
```

---

# 元件架構

```
InvestmentDetail
│
├── SummaryCards
├── TransactionTable
├── DividendTable
├── TransactionForm
├── DividendForm
└── Modal
```

---

# 設計原則

每個 Component 只負責一件事情（Single Responsibility）。

例如：

SummaryCards

只顯示摘要資訊。

不負責計算。

---

TransactionTable

只顯示交易紀錄。

不負責新增交易。

---

TransactionForm

只負責輸入。

不負責存資料。

---

InvestmentDetail

負責組合畫面與管理 State。