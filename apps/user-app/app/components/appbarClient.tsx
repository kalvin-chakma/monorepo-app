"use client";
import { Appbar } from "@workspace/ui/components/appbar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@repo/ui/lib/utils";

export const AppbarClient = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className={cn("sticky top-0 z-50 bg-white shadow")}>
      <Appbar
        user={{ email: session?.user?.email ?? null }}
        onSignin={() => router.push("/signin")}
        onSignOut={async () => {
          await signOut({ redirect: false });
          router.push("/signin");
        }}
      />
    </div>
  );
};
