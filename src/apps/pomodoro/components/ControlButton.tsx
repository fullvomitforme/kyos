import { useEffect, useState } from "react";

type ButtonType = "play" | "stop" | "reset";

interface ControlButtonProps {
  type: ButtonType;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
  autoDeactivateMs?: number; // For reset button's 600ms auto-deactivate
}

/**
 * ControlButton component - Circular button with SVG icons
 * Has idle and active states with neumorphic styling
 */
export function ControlButton({
  type,
  isActive,
  onClick,
  disabled,
  autoDeactivateMs,
}: ControlButtonProps) {
  const [localActive, setLocalActive] = useState(isActive);

  useEffect(() => {
    setLocalActive(isActive);
  }, [isActive]);

  const handleClick = () => {
    if (disabled) return;

    onClick();

    // Handle auto-deactivation for reset button
    if (autoDeactivateMs && type === "reset") {
      setLocalActive(true);
      setTimeout(() => {
        setLocalActive(false);
      }, autoDeactivateMs);
    }
  };

  const displayActive = type === "reset" ? localActive : isActive;

  // Icon color based on state
  const iconColor = displayActive ? "#e96034" : "#363636";

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="relative w-[78px] h-[78px] cursor-pointer focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      aria-label={`${type} button`}
    >
      {/* Button base with neumorphic styling */}
      <div
        className="absolute inset-0 rounded-[6px] bg-[#e0e0e0]"
        style={{
          boxShadow: "inset 1px 1px 4px 0px rgba(255,255,255,0.25)",
        }}
      />

      {/* Inner circle */}
      <div
        className="absolute border border-[rgba(255,255,255,0.21)] rounded-full"
        style={{
          left: "13px",
          top: "13px",
          width: "51px",
          height: "51px",
          boxShadow:
            "3px 3px 15px 0px rgba(49,51,62,0.81), -2px -2px 15px 4px #ffffff",
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow:
              "inset -1px -1px 2px -1px rgba(0,0,0,0.6), inset 2px 2px 2px -2px rgba(255,255,255,0.75)",
          }}
        />
      </div>

      {/* Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        {type === "play" && <PlayIcon color={iconColor} />}
        {type === "stop" && <StopIcon color={iconColor} />}
        {type === "reset" && <ResetIcon color={iconColor} />}
      </div>
    </button>
  );
}

function PlayIcon({ color }: { color: string }) {
  return (
    <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
      <path
        d="M11 6.5L0.5 12.5V0.5L11 6.5Z"
        fill={color}
        stroke={color}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StopIcon({ color }: { color: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect
        x="0.5"
        y="0.5"
        width="12"
        height="12"
        rx="1"
        fill={color}
      />
    </svg>
  );
}

function ResetIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
      <path
        d="M1 6.5H15M1 6.5L6 1M1 6.5L6 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

