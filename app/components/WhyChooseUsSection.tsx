'use client';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';

// ── EXACT icons from the HTML reference ──────────────────────
const IconWorkspacePremium = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
    <path d="M12 1L9.5 6.5 3 7.27l4.5 4.38L6.18 18 12 14.77 17.82 18l-1.32-6.35L21 7.27l-6.5-.77z" />
  </svg>
);

const IconPayments = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
  </svg>
);

const IconSearchInsights = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    <path d="M8 11h1v1H8v-1zm0-2h1v1H8V9zm0-2h1v1H8V7zm2 4h1v1h-1v-1zm0-2h1v1h-1V9zm0-2h1v1h-1V7zm2 4h1v1h-1v-1zm0-2h1v1h-1V9z" />
  </svg>
);

const IconDraw = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M17.75 7L14 3.25l-10 10V17h3.75l10-10zm2.96-2.96a1 1 0 0 0 0-1.41L18.37.29a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83zM2 20.5C2 21.33 2.67 22 3.5 22H6v-2.5H3.5c-.28 0-.5-.22-.5-.5v-2H1v2.5c0 .83.67 1.5 1 1z" />
  </svg>
);

const IconBolt = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
  </svg>
);

const IconPersonCelebrate = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    <circle cx="18" cy="5" r="1.5" />
    <path d="M16.5 3.5l1 1M19.5 3.5l-1 1M18 2v1.5M18 7v1M16 6l1-1M20 6l-1-1" />
  </svg>
);

const IconVerifiedGhost = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "9rem", height: "9rem" }}>
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </svg>
);

// ── Responsive hook ───────────────────────────────────────────
function useBreakpoint() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return {
    isMobile: width < 640,
    isTablet: width >= 640 && width < 1024,
    isDesktop: width >= 1024,
  };
}

// ── Color tokens ──────────────────────────────────────────────
const RED = "#FF3838";
const RED_GLOW = "rgba(255, 56, 56, 0.35)";
const RED_SOFT = "rgba(255, 56, 56, 0.12)";
const RED_BORDER = "rgba(255, 56, 56, 0.4)";
const CARD_BG = "#111827";
const CARD_BORDER = "rgba(255,255,255,0.07)";
const CARD_BORDER_HOVER = "rgba(255, 56, 56, 0.45)";

function HoverCard({
  style,
  children,
}: {
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...style,
        boxShadow: hovered
          ? `0 0 30px ${RED_GLOW}, inset 0 0 0 1px ${RED_BORDER}`
          : "none",
        borderColor: hovered ? RED_BORDER : CARD_BORDER,
        transition: "box-shadow 0.3s, border-color 0.3s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
}

const base: React.CSSProperties = {
  background: CARD_BG,
  border: `1px solid ${CARD_BORDER}`,
  borderRadius: "0.75rem",
  padding: "2rem",
  cursor: "default",
};

const iconBox: React.CSSProperties = {
  width: "3.5rem",
  height: "3.5rem",
  borderRadius: "0.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: RED_SOFT,
  border: `1px solid ${RED_BORDER}`,
  color: RED,
  flexShrink: 0,
};

export default function WhyChooseUs() {
  const [q1Hovered, setQ1Hovered] = useState(false);
  const { t } = useLanguage();
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  const w = t.why;
  const c = w.cards;
  const titleLines = w.title.split("\n");

  const gridCols = isMobile
    ? "1fr"
    : isTablet
    ? "repeat(6, 1fr)"
    : "repeat(12, 1fr)";
  const gap = isMobile ? "1rem" : "1.5rem";

  const span = (mobile: number, tablet: number, desktop: number) =>
    `span ${isMobile ? mobile : isTablet ? tablet : desktop}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "white",
        fontFamily: "Inter, sans-serif",
        background: "#0b0f18",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          padding: isMobile
            ? "3rem 1rem"
            : isTablet
            ? "4rem 1.5rem"
            : "5rem 2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── Header ── */}
        <div style={{ marginBottom: isMobile ? "3rem" : "5rem", position: "relative" }}>
          {/* Red accent line */}
          <div
            style={{
              width: "3rem",
              height: "4px",
              background: RED,
              borderRadius: "2px",
              marginBottom: "1.5rem",
              boxShadow: `0 0 12px ${RED_GLOW}`,
            }}
          />

          <h2
            style={{
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              fontWeight: 900,
              fontStyle: "italic",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              whiteSpace: "pre-line",
            }}
          >
            {/* First line white, keyword in red */}
            <span style={{ color: "#FFFFFF" }}>{titleLines[0]}{"\n"}</span>
            <span
              style={{
                color: RED,
                textShadow: `0 0 40px ${RED_GLOW}`,
              }}
            >
              {titleLines[1]}
            </span>
          </h2>

          <p
            style={{
              fontSize: isMobile ? "1rem" : "1.25rem",
              color: "rgba(255,255,255,0.45)",
              maxWidth: "36rem",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            {w.subtitle}
          </p>
        </div>

        {/* ── Responsive Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            gap,
          }}
        >
          {/* 1. Quality — large featured card */}
          <div
            style={{
              ...base,
              gridColumn: span(1, 6, 4),
              gridRow: isDesktop ? "span 2" : "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
              boxShadow: q1Hovered
                ? `0 0 35px ${RED_GLOW}, inset 0 0 0 1px ${RED_BORDER}`
                : "none",
              borderColor: q1Hovered ? RED_BORDER : CARD_BORDER,
              transition: "box-shadow 0.3s, border-color 0.3s",
            }}
            onMouseEnter={() => setQ1Hovered(true)}
            onMouseLeave={() => setQ1Hovered(false)}
          >
            {/* Ghost icon watermark — tinted red on hover */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                padding: "1rem",
                color: RED,
                opacity: q1Hovered ? 0.18 : 0.06,
                transition: "opacity 0.3s",
              }}
            >
              <IconVerifiedGhost />
            </div>

            <div>
              <div style={{ ...iconBox, marginBottom: "2rem" }}>
                <IconWorkspacePremium />
              </div>
              <h3
                style={{
                  fontSize: isMobile ? "1.5rem" : "1.875rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                  color: "white",
                }}
              >
                {c.quality.title}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                {c.quality.desc}
              </p>
            </div>

            <div
              style={{
                marginTop: "3rem",
                color: RED,
                fontWeight: 700,
                letterSpacing: "0.12em",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              {c.quality.tag}
              <span
                style={{
                  height: "1px",
                  width: "3rem",
                  background: RED,
                  opacity: 0.5,
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* 2. Price */}
          <HoverCard
            style={{
              ...base,
              gridColumn: span(1, 6, 8),
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "2rem",
              alignItems: isMobile ? "flex-start" : "center",
            }}
          >
            <div style={iconBox}>
              <IconPayments />
            </div>
            <div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                  color: "white",
                }}
              >
                {c.price.title}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.55)" }}>{c.price.desc}</p>
            </div>
          </HoverCard>

          {/* 3. Personalized */}
          <HoverCard
            style={{
              ...base,
              gridColumn: span(1, 6, 8),
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "flex-start",
                gap: "1.5rem",
              }}
            >
              <div style={iconBox}>
                <IconPersonCelebrate />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    marginBottom: "0.75rem",
                    color: "white",
                  }}
                >
                  {c.personal.title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.55)" }}>
                  {c.personal.desc}
                </p>
              </div>
            </div>
          </HoverCard>

          {/* 4. SEO */}
          <HoverCard
            style={{
              ...base,
              gridColumn: span(1, 3, 4),
            }}
          >
            <div style={{ ...iconBox, marginBottom: "1.5rem" }}>
              <IconSearchInsights />
            </div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
                color: "white",
              }}
            >
              {c.seo.title}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.55)" }}>{c.seo.desc}</p>
          </HoverCard>

          {/* 5. Design */}
          <HoverCard
            style={{
              ...base,
              gridColumn: span(1, 3, 4),
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: "-2.5rem",
                right: "-2.5rem",
                width: "10rem",
                height: "10rem",
                borderRadius: "9999px",
                background: RED_SOFT,
                filter: "blur(3rem)",
              }}
            />
            <div style={{ ...iconBox, marginBottom: "1.5rem" }}>
              <IconDraw />
            </div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
                color: "white",
              }}
            >
              {c.design.title}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.55)" }}>{c.design.desc}</p>
          </HoverCard>

          {/* 6. Fast — red accent card */}
          <div
            style={{
              gridColumn: span(1, 6, 4),
              background: `linear-gradient(135deg, ${RED} 0%, #c41f1f 100%)`,
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "0.75rem",
              padding: "2rem",
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 0 40px ${RED_GLOW}`,
            }}
          >
            <div
              style={{
                position: "relative",
                zIndex: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ color: "white", marginBottom: "1.5rem" }}>
                <IconBolt />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    fontStyle: "italic",
                    color: "white",
                    marginBottom: "0.5rem",
                  }}
                >
                  {c.fast.title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.875rem" }}>
                  {c.fast.desc}
                </p>
              </div>
            </div>

            {/* Decorative circle */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "8rem",
                height: "8rem",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.12)",
                transform: "translate(50%,-50%)",
              }}
            />
            {/* Glow blob */}
            <div
              style={{
                position: "absolute",
                bottom: "-3rem",
                left: "-2rem",
                width: "12rem",
                height: "12rem",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.08)",
                filter: "blur(2rem)",
              }}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: isMobile ? "3rem" : "4rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CTAButton />
        </div>
      </div>
    </div>
  );
}

function CTAButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/contact"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "1rem 2.5rem",
        background: hovered
          ? "transparent"
          : `linear-gradient(135deg, ${RED} 0%, #c41f1f 100%)`,
        border: `2px solid ${RED}`,
        borderRadius: "0.5rem",
        color: "white",
        fontWeight: 700,
        fontSize: "1rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        textDecoration: "none",
        cursor: "pointer",
        boxShadow: hovered
          ? `0 0 40px ${RED_GLOW}, 0 0 80px rgba(255,56,56,0.15)`
          : `0 0 20px ${RED_GLOW}`,
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.25s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Shimmer sweep on hover */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
          transform: hovered ? "translateX(100%)" : "translateX(-100%)",
          transition: "transform 0.5s ease",
        }}
      />

      <span style={{ position: "relative", zIndex: 1 }}>Get in Touch</span>

      {/* Arrow icon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          width: "1.1rem",
          height: "1.1rem",
          position: "relative",
          zIndex: 1,
          transform: hovered ? "translateX(4px)" : "translateX(0)",
          transition: "transform 0.25s ease",
        }}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}