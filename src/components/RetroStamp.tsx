import type { ReactNode } from "react";

type StampProps = {
  children: ReactNode;
  as?: "article" | "div";
  className?: string;
  contentClassName?: string;
  tone?: "paper" | "ink" | "orange" | "yellow";
  edge?: "sides" | "all";
  serial?: string;
  status?: string;
};

/** The unmasked shell casts the shadow; its child supplies real edge cutouts. */
export function RetroStamp({ children, as: Container = "article", className = "", contentClassName = "", tone = "paper", edge = "sides", serial, status }: StampProps) {
  return <div className={`retro-stamp-shell ${className}`}>
    <Container className={`retro-stamp ${contentClassName}`} data-tone={tone} data-edge={edge}>
      {(serial || status) && <header className="retro-stamp-meta">
        {serial && <span className="retro-serial">{serial}</span>}
        {status && <span className="retro-status">{status}</span>}
      </header>}
      {children}
    </Container>
  </div>;
}

/** Use a real, labelled value: this is a meter, not fabricated live telemetry. */
export function RetroMeter({ label, value, valueLabel }: { label: string; value: number; valueLabel?: string }) {
  const percent = Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));
  return <div className="retro-meter">
    <div className="retro-meter-label"><span>{label}</span><span aria-hidden="true">{valueLabel ?? `${Math.round(percent)}%`}</span></div>
    <meter min={0} max={100} value={percent} aria-label={label} aria-valuetext={valueLabel ?? `${Math.round(percent)} percent`}>{percent}%</meter>
  </div>;
}
