"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">مشکلی پیش آمد</h1>
      <p className="text-muted-foreground">
        در دریافت اطلاعات از سرویس فیلم خطایی رخ داد. لطفاً دوباره تلاش کنید.
      </p>
      <Button onClick={() => reset()}>تلاش مجدد</Button>
    </div>
  );
}
