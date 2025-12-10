interface ProgressBarProps {
  progress: number; // 0 to 1
  totalDuration: number; // in seconds, determines bar width
}

/**
 * ProgressBar component - Shows timer progress
 * Width varies based on selected duration (5min = short, 15min = medium, 25min = full)
 */
export function ProgressBar({ progress, totalDuration }: ProgressBarProps) {
  // Calculate bar width based on duration
  // 5 min = 50px, 15 min = 100px, 25 min = 150px
  const getBarWidth = () => {
    const minutes = totalDuration / 60;
    if (minutes <= 5) return 50;
    if (minutes <= 15) return 100;
    return 150;
  };

  const barWidth = getBarWidth();
  const filledWidth = barWidth * Math.min(progress, 1);

  return (
    <div
      className="relative h-[4px] bg-white/20 rounded-full overflow-hidden"
      style={{ width: `${barWidth}px` }}
    >
      <div
        className="absolute left-0 top-0 h-full bg-[#e96034] rounded-full transition-[width] duration-100"
        style={{ width: `${filledWidth}px` }}
      />
    </div>
  );
}

