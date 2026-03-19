// El studio necesita ocupar toda la pantalla sin el Navbar/Footer del root layout.
// Este wrapper con position:fixed y z-index alto escapa del flujo del documento.
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="fixed inset-0 z-9">{children}</div>;
}
