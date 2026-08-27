import { Btn } from "./hooksAndUi";
import { DROP_WHATSAPP_URL } from "./dropContactLinks";

type DropWhatsAppBtnProps = {
  variant?: "primary" | "ghost" | "light";
  className?: string;
};

/** Pulsante WhatsApp — sempre la stessa conversazione (+39 347 557 1187). */
export function DropWhatsAppBtn({ variant = "ghost", className = "" }: DropWhatsAppBtnProps) {
  return (
    <Btn
      variant={variant}
      href={DROP_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      Scrivici su WhatsApp
    </Btn>
  );
}
