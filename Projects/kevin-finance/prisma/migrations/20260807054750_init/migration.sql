-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "market" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assetId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "shares" REAL NOT NULL,
    "price" REAL NOT NULL,
    "fee" REAL NOT NULL,
    "tax" REAL NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    CONSTRAINT "Transaction_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Dividend" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assetId" TEXT NOT NULL,
    "exDividendDate" TEXT NOT NULL,
    "paymentDate" TEXT NOT NULL,
    "dividendPerShare" REAL NOT NULL,
    "shares" REAL NOT NULL,
    "totalDividend" REAL NOT NULL,
    "withholdingTax" REAL NOT NULL,
    "handlingFee" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    CONSTRAINT "Dividend_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
