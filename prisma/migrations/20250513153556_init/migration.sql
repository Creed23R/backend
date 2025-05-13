/*
  Warnings:

  - The values [BARn] on the enum `UnidadVenta` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UnidadVenta_new" AS ENUM ('CJA', 'PAQ', 'BOL', 'BOT', 'BAR', 'SCH');
ALTER TABLE "Producto" ALTER COLUMN "unidadVenta" TYPE "UnidadVenta_new" USING ("unidadVenta"::text::"UnidadVenta_new");
ALTER TYPE "UnidadVenta" RENAME TO "UnidadVenta_old";
ALTER TYPE "UnidadVenta_new" RENAME TO "UnidadVenta";
DROP TYPE "UnidadVenta_old";
COMMIT;
