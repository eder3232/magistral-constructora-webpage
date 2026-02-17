/**
 * Configuración centralizada del sitio (contacto, dirección, redes).
 * Modificar aquí para que los cambios se reflejen en toda la página.
 */
export const SITE_CONTACT = {
  /** Número de teléfono tal como se muestra al usuario */
  telefonoDisplay: "+51 913 367 969",
  /** Valor para enlaces tel: (sin espacios) */
  telefonoHref: "tel:+51913367960",
  /** Email de contacto general (footer, contacto) */
  emailToShowInThePage: "eldebar.snk@gmail.com",
  emailSendLeads: "eldebar.snk@gmail.com",
  /** Email receptor oficial del Libro de Reclamaciones (Soporte) */
  emailSoporte: "eder.learning.tiktok@outlook.com",
  direccion: "Calle Los Arces N°220, Cayma, Arequipa",
} as const;

/** URLs de redes sociales para el footer. Reemplazar con las reales de la empresa. */
export const SITE_SOCIAL = [
  { url: "https://www.facebook.com/magistralconstructora/", label: "Facebook" },
  { url: "https://www.instagram.com/magistralconstructora/", label: "Instagram" },
  { url: "https://www.tiktok.com/@magistralconstructora/", label: "Tiktok" },
] as const;
