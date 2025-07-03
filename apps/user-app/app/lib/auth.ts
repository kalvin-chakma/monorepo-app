import { client } from "@repo/db/client";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const existingUser = await client.user.findUnique({
          where: { username: credentials.username },
        });

        if (existingUser) {
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (passwordMatch) {
            return {
              id: existingUser.id.toString(),
              username: existingUser.username,
            };
          }
          return null;
        }

        try {
          const hashPassword = await bcrypt.hash(credentials.password, 10);

          const user = await client.user.create({
            data: {
              username: credentials.username,
              password: hashPassword,
            },
          });

          return {
            id: user.id.toString(),
            username: user.username,
          };
        } catch (error) {
          console.error("Error creating user:", error);
          return null;
        }
      },
    }),
  ],
};
