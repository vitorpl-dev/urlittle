import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  const result = await next(params);

  if (params?.model === 'User' && params?.args?.select?.password !== true) {
    delete result.password;
  }

  return result;
});

export { prisma };
