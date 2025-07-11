import express, { Request, Response } from "express";
import { client } from "@repo/db/client";

const app = express();
const PORT = 5000;

app.use(express.json());

interface PaymentInfo {
  token: string;
  userId: string;
  amount: string;
}

app.post("/hdfcServer", async (req: Request, res: Response) => {
  const { token, userId, amount }: PaymentInfo = req.body;

  if (!token || !userId || !amount) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const numericAmount = Number(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  try {
    await client.$transaction([
      client.balance.updateMany({
        where: { userId },
        data: {
          amount: {
            increment: numericAmount,
          },
        },
      }),
      client.onRampTransaction.updateMany({
        where: { token },
        data: { status: "Success" },
      }),
    ]);

    console.log(`Transaction successful for user: ${userId}, amount: ${numericAmount}`);
    return res.status(200).json({ message: "Transaction successful" });
  } catch (error) {
    console.error("Transaction failed:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Bank Server running on http://localhost:${PORT}`);
});
