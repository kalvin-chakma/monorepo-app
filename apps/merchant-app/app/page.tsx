import { client } from "@repo/db/client";
import { Appbar } from "@workspace/ui/components/appbar";

export default async function Home() {
  const user = await client.user.findFirst();
  return (
    <div className="text-3xl font-bold underline">
      <Appbar />
      kalvin chakma
      {user?.username}
      {user?.password}
    </div>
  );
}
