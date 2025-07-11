import { PrismaClient } from "../generated/prisma"; // Adjust path if needed
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Seed user: Alice
  const alice = await prisma.user.upsert({
    where: { username: "alice" },
    update: {},
    create: {
      username: "alice",
      email: "alice@example.com",
      password: await bcrypt.hash("alice", 10),
      Balance: {
        create: {
          amount: 20000,
          locked: 0,
        },
      },
      onRampTransactions: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token__1",
          provider: "HDFC Bank",
        },
      },
    },
  });

  // Seed user: Bob
  const bob = await prisma.user.upsert({
    where: { username: "bob" },
    update: {},
    create: {
      username: "bob",
      email: "bob@example.com",
      password: await bcrypt.hash("bob", 10),
      Balance: {
        create: {
          amount: 2000,
          locked: 0,
        },
      },
      onRampTransactions: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "token__2",
          provider: "HDFC Bank",
        },
      },
    },
  });

  console.log("Seeded users:", { alice, bob });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seeding error:", e);
    await prisma.$disconnect();
    throw e; 
  });
