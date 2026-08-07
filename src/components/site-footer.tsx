export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center text-xs text-muted-foreground">
        <p>
          این محصول از وب‌سرویس TMDB استفاده می‌کند اما توسط TMDB تأیید یا
          پشتیبانی نمی‌شود.
        </p>
        <p>© {new Date().getFullYear()} فیلم‌بین — فقط برای نمایش اطلاعات فیلم‌ها</p>
      </div>
    </footer>
  );
}
