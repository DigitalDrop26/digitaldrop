import type { CSSProperties } from "react";
import {
  IUBENDA_COOKIE_POLICY_URL,
  IUBENDA_EMBED_LINK_CLASS,
  IUBENDA_EMBED_OVERFLOW_ATTR,
  IUBENDA_PRIVACY_POLICY_URL,
} from "./iubendaConfig";
import { useIubendaEmbed } from "./useIubendaEmbed";

type DropIubendaLegalLinksProps = {
  className?: string;
  style?: CSSProperties;
};

/** Privacy Policy e Cookie Policy — embed modale Iubenda. */
export function DropIubendaLegalLinks({ className = "", style }: DropIubendaLegalLinksProps) {
  useIubendaEmbed();

  const linkStyle = {
    color: "rgba(255,255,255,0.5)",
    ...style,
  };

  return (
    <div className={className} style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      <a
        href={IUBENDA_PRIVACY_POLICY_URL}
        className={IUBENDA_EMBED_LINK_CLASS}
        title="Privacy Policy"
        style={linkStyle}
        {...IUBENDA_EMBED_OVERFLOW_ATTR}
      >
        Privacy Policy
      </a>
      <a
        href={IUBENDA_COOKIE_POLICY_URL}
        className={IUBENDA_EMBED_LINK_CLASS}
        title="Cookie Policy"
        style={linkStyle}
        {...IUBENDA_EMBED_OVERFLOW_ATTR}
      >
        Cookie Policy
      </a>
    </div>
  );
}
