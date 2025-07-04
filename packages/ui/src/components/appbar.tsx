"use client";
interface AppbarProps {}

export const Appbar = ({}: AppbarProps) => {
  return (
    <div className="flex justify-between border-b px-4 bg-amber-700">
      <div className="text-lg flex flex-col justify-center">PayTM</div>
      <div className="flex flex-col justify-center pt-2"></div>
    </div>
  );
};
