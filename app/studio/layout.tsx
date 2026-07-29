/**
 * The studio needs the whole viewport. The root layout always renders the
 * site nav (z-50) and footer, so we lift the studio above them rather than
 * splitting the app into two root layouts.
 */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 z-[9999] bg-base overflow-hidden">{children}</div>;
}
