import { Digit } from "./Digit";
import { ProgressBar } from "./ProgressBar";

interface FlipClockProps {
  minutes: number;
  seconds: number;
  milliseconds: number;
  completedPomodoros: number;
  totalDuration: number; // in seconds
  elapsed: number; // in seconds
}

/**
 * FlipClock component - Old-style flip clock with two digit displays
 * Shows date, completed pomodoros, milliseconds, and progress bar
 */
export function FlipClock({
  minutes,
  seconds,
  milliseconds,
  completedPomodoros,
  totalDuration,
  elapsed,
}: FlipClockProps) {
  // Format current date as "28 OCT"
  const formatDate = () => {
    const now = new Date();
    const day = now.getDate();
    const month = now
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();
    return `${day} ${month}`;
  };

  // Format minutes and seconds as two digits
  const formatMinutes = String(minutes).padStart(2, "0");
  const formatSeconds = String(seconds).padStart(2, "0");
  const formatMs = String(milliseconds).padStart(3, "0").slice(0, 2);

  // Calculate progress (0 to 1)
  const progress = totalDuration > 0 ? elapsed / totalDuration : 0;

  return (
    <div 
      className="relative"
      style={{ width: "391px", height: "160px" }}
    >
      {/* Timer frame background */}
      <div 
        className="absolute inset-0 rounded-[12px] bg-[#363636]"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      />

      <div className="relative px-[13px] pt-[13px] pb-[12px] h-full flex flex-col">
        {/* Top info row */}
        <div className="flex justify-between items-center mb-[8px] px-[6px]">
          <span
            className="text-[16px] text-white"
            style={{ fontFamily: '"Geist Mono", monospace', fontWeight: 100, textShadow: "0px 0px 8px rgba(255,255,255,0.1)" }}
          >
            {formatDate()}
          </span>
          <span
            className="text-[16px] text-white"
            style={{ fontFamily: '"Geist Mono", monospace', fontWeight: 100, textShadow: "0px 0px 8px rgba(255,255,255,0.1)" }}
          >
            {completedPomodoros} of 4 sessions
          </span>
        </div>

        {/* Clock face container */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="flex items-center">
            {/* Minutes */}
            <Digit value={formatMinutes} />

            {/* Colon separator */}
            <span
            className="text-[48px] text-white mx-[8px]"
            style={{
              fontFamily: '"Major Mono Display", monospace',
              textShadow: "0px 0px 8px rgba(255,255,255,0.1)",
            }}
            >
              :
            </span>

            {/* Seconds */}
            <Digit value={formatSeconds} />
          </div>
        </div>

        {/* Bottom info row */}
        <div className="flex justify-between items-end px-[6px]">
          <span
            className="text-[10px] text-white/60"
            style={{ fontFamily: '"Geist Mono", monospace', fontWeight: 100, textShadow: "0px 0px 8px rgba(255,255,255,0.1)" }}
          >
            .{formatMs}
          </span>
          <ProgressBar progress={progress} totalDuration={totalDuration} />
        </div>
      </div>
    </div>
  );
}
