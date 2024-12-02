export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex h-16 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <a href="/privacy" className="hover:text-foreground/80">
            Privacy
          </a>
          <a href="/terms" className="hover:text-foreground/80">
            Terms
          </a>
        </nav>
      </div>
    </footer>
  )
}