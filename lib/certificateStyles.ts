export const CERTIFICATE_STYLES = ["ledger", "imprint", "vault"] as const;
export type CertificateStyleId = (typeof CERTIFICATE_STYLES)[number];

export function isCertificateStyle(value: string | undefined): value is CertificateStyleId {
  return CERTIFICATE_STYLES.includes(value as CertificateStyleId);
}

export function resolveCertificateStyle(value: string | undefined): CertificateStyleId {
  if (isCertificateStyle(value)) return value;
  return "ledger";
}
