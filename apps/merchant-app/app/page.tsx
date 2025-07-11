import { client } from "@repo/db/client";
import { Appbar } from "@workspace/ui/components/appbar";

export default async function Home() {
  const user = await client.user.findFirst();
  return (
    <div>
      <Appbar />
      {user?.username}
      {user?.password}
    </div>
  );
}
