// Appbar.tsx
"use client";

import { Button } from "../button";

interface AppbarProps {
  user?: { email?: string | null };
  onSignin?: () => void;
  onSignOut?: () => void;
}

export const Appbar = ({ user, onSignin, onSignOut }: AppbarProps) => {
  return (
    <div className="flex justify-between shadow-md px-4">
      <div className="text-3xl flex flex-col justify-center items-center font-bold">
        Wallet
      </div>
      <div className="flex flex-col justify-center pt-2">
        {user?.email ? (
          <Button onClick={onSignOut}>Sign Out</Button>
        ) : (
          <Button onClick={onSignin}>Sign In</Button>
        )}
      </div>
    </div>
  );
};
