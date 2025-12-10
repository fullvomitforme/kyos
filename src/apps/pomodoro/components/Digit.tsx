import { useState, useEffect } from "react";

interface DigitProps {
  value: string;
}

/**
 * Digit component - Displays a two-digit number (top/bottom half)
 * with subtle flip behavior: top changes first, bottom follows after 300ms
 */
export function Digit({ value }: DigitProps) {
  const [displayTop, setDisplayTop] = useState(value);
  const [displayBottom, setDisplayBottom] = useState(value);

  useEffect(() => {
    // Top changes immediately
    setDisplayTop(value);

    // Bottom changes after 300ms delay
    const timer = setTimeout(() => {
      setDisplayBottom(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div
      className="relative flex flex-col overflow-hidden"
      style={{
        width: "132px",
        height: "101px",
        borderRadius: "4px",
      }}
    >
      {/* Top half */}
      <div
        className="relative overflow-hidden bg-[#e8e8e8]"
        style={{
          height: "50px",
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
          boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.1)",
        }}
      >
        <span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[100px] text-[#3f403f] leading-none select-none"
          style={{
            fontFamily: '"Major Mono Display", monospace',
            textShadow: "0px 0px 8px rgba(255,255,255,0.1)",
            letterSpacing: "-19px",
          }}
        >
          {displayTop}
        </span>
      </div>

      {/* Separator line */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#3f403f] z-10 -translate-y-1/2" />

      {/* Bottom half */}
      <div
        className="relative overflow-hidden bg-[#d8d8d8]"
        style={{
          height: "51px",
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.15)",
        }}
      >
        <span
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] text-[#3f403f] leading-none select-none"
          style={{
            fontFamily: '"Major Mono Display", monospace',
            textShadow: "0px 0px 8px rgba(255,255,255,0.1)",
            letterSpacing: "-19px",
          }}
        >
          {displayBottom}
        </span>
      </div>
    </div>
  );
}
