type BurgerIconProps = {
  open: boolean;
  className?: string;
  "aria-hidden"?: boolean;
};

export function BurgerIcon({ open, className, ...rest }: BurgerIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      width="40"
      height="40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{
          transformOrigin: "20px 20px",
          transform: open ? "rotate(90deg)" : undefined,
          transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <circle cx="20" cy="20" r="5.5" />
        <circle cx="20" cy="20" r="10.5" />
        <circle cx="20" cy="20" r="15.5" />
      </g>
    </svg>
  );
}
