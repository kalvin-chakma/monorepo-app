import { client } from "@repo/db/client";

export default async function Home() {
  const user = await client.user.findFirst();
  return (
    <div className="text-3xl font-bold underline">
      kalvin chakma
      {user?.username}
      {user?.password}
    </div>
  );
}
