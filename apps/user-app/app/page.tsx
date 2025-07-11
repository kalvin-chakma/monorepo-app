"use client";

import React from "react";
import { Appbar } from "@repo/ui/components/appbar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div>
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
}
