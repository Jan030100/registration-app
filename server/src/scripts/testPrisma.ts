import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || 'file:./prisma/dev.db',
});

const prisma = new PrismaClient({ adapter });

async function main(): Promise<void> {
  const email = `test-${Date.now()}@example.com`;

  const created = await prisma.user.create({
    data: {
      fullName: 'Test User',
      email,
      passwordHash: 'placeholder-not-a-real-hash',
    },
  });
  console.log('Created:', created);

  const found = await prisma.user.findUnique({ where: { email } });
  console.log('Found:', found);

  await prisma.user.delete({ where: { id: created.id } });
  console.log('Deleted test user');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });