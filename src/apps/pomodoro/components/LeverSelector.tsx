interface LeverSelectorProps {
  value: 5 | 15 | 25;
  onChange: (value: 5 | 15 | 25) => void;
  disabled?: boolean;
}

/**
 * LeverSelector component - Physical-style lever with 3 fixed states
 * Cycles through: 5 → 15 → 25 → 5 → ...
 */
export function LeverSelector({ value, onChange, disabled }: LeverSelectorProps) {
  // Get lever position based on value (0, 1, 2)
  const getPosition = () => {
    switch (value) {
      case 5:
        return 0;
      case 15:
        return 1;
      case 25:
        return 2;
      default:
        return 0;
    }
  };

  const handleClick = () => {
    if (disabled) return;
    // Cycle to next value
    const next = value === 5 ? 15 : value === 15 ? 25 : 5;
    onChange(next);
  };

  const position = getPosition();

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="relative w-[78px] h-[78px] cursor-pointer focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      aria-label={`Select duration: currently ${value} minutes`}
    >
      {/* Button base with neumorphic styling */}
      <div
        className="absolute inset-0 rounded-[6px] bg-[#e0e0e0]"
        style={{
          boxShadow: "inset 1px 1px 4px 0px rgba(255,255,255,0.25)",
        }}
      />

      {/* Lever track */}
      <div
        className="absolute bg-[#363636] left-1/2 -translate-x-1/2"
        style={{
          width: "6px",
          height: "57px",
          top: "10px",
          boxShadow:
            "-2px -2px 15px 4px #ffffff, 3px 3px 15px 0px rgba(49,51,62,0.81)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            boxShadow:
              "inset 2px 2px 2px -2px rgba(255,255,255,0.75), inset -1px -1px 2px -1px rgba(0,0,0,0.6)",
          }}
        />
      </div>

      {/* Lever handle */}
      <div
        className="absolute bg-[#363636] left-1/2 -translate-x-1/2 transition-[top] duration-150"
        style={{
          width: "20px",
          height: "6px",
          top: `${10 + position * 17}px`,
          boxShadow: "0px 1px 3.1px 0px rgba(0,0,0,0.53)",
        }}
      />

      {/* Value labels */}
      <div className="absolute left-[9px] top-[10px] flex flex-col gap-[6px]">
        <span
          className={`text-[11px] tracking-[-2.09px] ${
            value === 5 ? "text-[#e96034]" : "text-[#3f403f]"
          }`}
          style={{ fontFamily: '"Major Mono Display", monospace', textShadow: "0px 0px 8px rgba(255,255,255,0.1)" }}
        >
          5
        </span>
        <span
          className={`text-[11px] tracking-[-2.09px] ${
            value === 15 ? "text-[#e96034]" : "text-[#3f403f]"
          }`}
          style={{ fontFamily: '"Major Mono Display", monospace', textShadow: "0px 0px 8px rgba(255,255,255,0.1)" }}
        >
          15
        </span>
        <span
          className={`text-[11px] tracking-[-2.09px] ${
            value === 25 ? "text-[#e96034]" : "text-[#3f403f]"
          }`}
          style={{ fontFamily: '"Major Mono Display", monospace', textShadow: "0px 0px 8px rgba(255,255,255,0.1)" }}
        >
          25
        </span>
      </div>
    </button>
  );
}

