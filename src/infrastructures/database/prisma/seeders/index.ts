import { PrismaClient } from '@prisma/client';
import codeSeeder from './code.seeder';
import permissionSeeder from './permission.seeder';
import roleSeeder from './role.seeder';
import userSeeder from './user.seeder';

const prisma = new PrismaClient();

async function seeder() {
  await codeSeeder({ prisma });
  await permissionSeeder({ prisma });
  await roleSeeder({ prisma });
  await userSeeder({ prisma });
}

seeder().catch((error) => console.error(error));
