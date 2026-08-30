export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-12 py-4 text-center text-sm text-muted-foreground">
      &copy; {currentYear} Out And Out Recordings
    </footer>
  )
}
