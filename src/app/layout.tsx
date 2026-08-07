import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: {
    default: "فیلم‌بین | مرجع فیلم‌ها بر اساس ژانر",
    template: "%s | فیلم‌بین",
  },
  description:
    "فهرست فیلم‌ها بر اساس ژانر و مشاهده جزئیات کامل هر فیلم به زبان فارسی.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
