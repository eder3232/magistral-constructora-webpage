// El studio/sanity necesita ocupar toda la pantalla sin Navbar/Footer del root layout.
// Este wrapper con position:fixed escapa del flujo del documento.
export default function SanityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="fixed inset-0 z-50">{children}</div>;
}

