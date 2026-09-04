/** Iubenda — Drop Srl (siteId 3711256, cookiePolicyId 35509802). */
export const IUBENDA_PRIVACY_POLICY_URL = "https://www.iubenda.com/privacy-policy/35509802";
export const IUBENDA_COOKIE_POLICY_URL = "https://www.iubenda.com/privacy-policy/35509802/cookie-policy";

export const IUBENDA_EMBED_LINK_CLASS =
  "iubenda-white no-brand iubenda-noiframe iubenda-embed";

/** Evita che Iubenda modifichi overflow su html (rompe scroll modale con Lenis). */
export const IUBENDA_EMBED_OVERFLOW_ATTR = {
  "data-iub-overflow": "false",
} as const;

export const IUBENDA_CS_CONFIGURATION = {
  siteId: 3711256,
  cookiePolicyId: 35509802,
  lang: "it",
  storage: { useSiteId: true },
} as const;
