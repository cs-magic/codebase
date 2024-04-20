import { prisma } from "../../../common/db/providers/prisma";

/**
 * @description
 * ## Usage
 * 1. clean a whole table: `tsx scripts/clean-db TABLE_NAME`
 * 2. clean a row of table: `tsx scripts/clean-db TABLE_NAME ROW_ID`
 */
const cleanDB = async () => {
  const tableName = process.argv[2];
  const rowId = process.argv[3];
  console.log("cleaning table: ", tableName);
  if (!tableName) return;

  // @ts-ignore
  const table = prisma[tableName];

  let result: string | null = null;
  if (!rowId) {
    result = await table.deleteMany();
  } else {
    result = await table.deleteOne({ where: { id: rowId } });
  }
  console.log("cleaned result: ", result);
};

void cleanDB().finally(async () => {
  await prisma.$disconnect();
});
