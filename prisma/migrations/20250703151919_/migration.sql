/*
  Warnings:

  - Added the required column `prices` to the `flavors` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_flavors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "prices" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_flavors" ("createdAt", "id", "name", "slug", "updatedAt", "uuid") SELECT "createdAt", "id", "name", "slug", "updatedAt", "uuid" FROM "flavors";
DROP TABLE "flavors";
ALTER TABLE "new_flavors" RENAME TO "flavors";
CREATE UNIQUE INDEX "flavors_uuid_key" ON "flavors"("uuid");
CREATE UNIQUE INDEX "flavors_slug_key" ON "flavors"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
