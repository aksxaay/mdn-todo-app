import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient

declare const global: any
// issue: https://github.com/prisma/prisma/issues/5007#issuecomment-618433162

if (process.env.NODE_ENV == "production") {
  prisma = new PrismaClient();
} else {
  global.prisma = global.prisma || new PrismaClient()
  prisma = global.prisma
}

export default prisma;