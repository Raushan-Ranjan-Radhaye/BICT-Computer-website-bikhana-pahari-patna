type IconProps = {
  name: string;
  className?: string;
};

const PATHS: Record<string, React.ReactNode> = {
  computer: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4M6 7h12M6 10.5h7" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
    </>
  ),
  calculator: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15v3M8 18h4" />
    </>
  ),
  ledger: (
    <>
      <path d="M4 4h16v16H4z" />
      <path d="M8 2v20M12 8h5M12 12h5M12 16h5" />
    </>
  ),
  palette: (
    <>
      <path d="M12 21a9 9 0 1 1 9-9c0 1.7-1.3 3-3 3h-1.5a2.5 2.5 0 0 0-1.8 4.2A1.9 1.9 0 0 1 12 21Z" />
      <circle cx="7.5" cy="12" r="1" />
      <circle cx="9.5" cy="8" r="1" />
      <circle cx="14.5" cy="7.5" r="1" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m8.5 14.5-1.5 7L12 19l5 2.5-1.5-7" />
    </>
  ),
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ),
  code: (
    <>
      <path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 3l-4 18" />
    </>
  ),
  certificate: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m9 14.5-1 7 4-2.2 4 2.2-1-7" />
      <path d="m9.5 9 1.8 1.8L15 7" />
    </>
  ),
  ac: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <path d="M6 9v6M9 9v6M15 9v6M18 9v6" />
    </>
  ),
  wifi: (
    <>
      <path d="M2.5 8.5a15 15 0 0 1 19 0M5.5 12a10.5 10.5 0 0 1 13 0M8.5 15.5a6 6 0 0 1 7 0" />
      <circle cx="12" cy="19" r="1" />
    </>
  ),
  power: (
    <>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </>
  ),
  lab: (
    <>
      <rect x="2" y="7" width="20" height="13" rx="2" />
      <path d="M6 7V4h12v3M9 12h6M12 9v6" />
    </>
  ),
  one: (
    <>
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="M12 11v6M9 17h6M8 8h.01" />
      <path d="M5 20.5 3 22" />
    </>
  ),
  weekly: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4M8 14h3M8 17h8" />
    </>
  ),
  doubt: (
    <>
      <path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z" />
      <path d="M9.5 9.2a2.6 2.6 0 1 1 3.3 2.5c-.6.2-.9.8-.9 1.4v.4" />
      <path d="M12 17h.01" />
    </>
  ),
  assignment: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  test: (
    <>
      <path d="M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1Z" />
      <path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" />
      <path d="m8.5 13 2 2 4.5-4.5" />
    </>
  ),
  quiz: (
    <>
      <path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z" />
      <path d="M9.2 9a2.8 2.8 0 1 1 4 2.5c-.7.3-1.1 1-1.1 1.8" />
      <path d="M12 17h.01" />
    </>
  ),
  job: (
    <>
      <rect x="2" y="7" width="20" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2 13h20M11 13v2h2v-2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2 12h20" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  keyboard: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12" />
    </>
  ),
  phone: (
    <>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 3 1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3Z" />
      <path d="M18.5 15.5 19.3 18l2.2.8-2.2.8-.8 2.4-.8-2.4-2.2-.8 2.2-.8.8-2.5Z" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="m4 12 5.5 5.5L20 6.5" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  shield: (
    <>
      <path d="M12 2 4 5.5v6c0 5 3.4 9.2 8 10.5 4.6-1.3 8-5.5 8-10.5v-6L12 2Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3 21l1.7-5a8.5 8.5 0 1 1 3.3 3.3L3 21Z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.4 1-1l-.2-1-1.6-.6-.8 1a5 5 0 0 1-2.3-2.3l1-.8-.6-1.6-1-.2c-.6 0-1 .4-1 1Z" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.5-7-9.3A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.7c0 4.8-7 9.3-7 9.3Z" />
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </>
  ),
  bellOff: (
    <>
      <path d="M18 8a6 6 0 0 0-9.3-5" />
      <path d="M6 8v0c0 7-3 8-3 8h14" />
      <path d="M2 2l20 20" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2 20a7 7 0 0 1 14 0" />
      <path d="M16 5.2a3.5 3.5 0 0 1 0 5.6M18 20a7 7 0 0 0-2-4.5" />
    </>
  ),
};

export default function Icon({ name, className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name] ?? PATHS.sparkles}
    </svg>
  );
}
