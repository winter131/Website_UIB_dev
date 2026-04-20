const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCategories() {
  const categories = await prisma.news.groupBy({
    by: ['category'],
    _count: {
      category: true,
    },
  });
  console.log('Categories in DB:', JSON.stringify(categories, null, 2));
  process.exit(0);
}

checkCategories();
