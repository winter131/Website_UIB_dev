const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.news.findMany().then(res => console.dir(res, { depth: null })).finally(() => prisma.$disconnect());
