import { useState, useEffect, useCallback, useRef } from "react";
import { AppProps } from "../../base/types";
import { WindowFrame } from "@/components/layout/WindowFrame";
import { HelpDialog } from "@/components/dialogs/HelpDialog";
import { AboutDialog } from "@/components/dialogs/AboutDialog";
import { PomodoroMenuBar } from "./PomodoroMenuBar";
import { FlipClock } from "./FlipClock";
import { LeverSelector } from "./LeverSelector";
import { ControlButton } from "./ControlButton";
import { helpItems, appMetadata } from "..";
import { useTranslatedHelpItems } from "@/hooks/useTranslatedHelpItems";
import { useSound, Sounds } from "@/hooks/useSound";
import { useThemeStore } from "@/stores/useThemeStore";
import { getTranslatedAppName } from "@/utils/i18n";

type TimerState = "idle" | "running" | "paused";
type Duration = 5 | 15 | 25;

export function PomodoroAppComponent({
  isWindowOpen,
  onClose,
  isForeground,
  skipInitialSound,
  instanceId,
  onNavigateNext,
  onNavigatePrevious,
}: AppProps) {
  const translatedHelpItems = useTranslatedHelpItems("pomodoro", helpItems || []);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false);

  // Timer state
  const [selectedDuration, setSelectedDuration] = useState<Duration>(25);
  const [timerState, setTimerState] = useState<TimerState>("idle");
  const [remainingMs, setRemainingMs] = useState(25 * 60 * 1000);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  // Reset button active state (for 600ms auto-deactivate)
  const [resetActive, setResetActive] = useState(false);

  // Sound effects
  const { play: playClick } = useSound(Sounds.CLICK, 0.3);
  const { play: playComplete } = useSound(Sounds.ALERT_INDIGO, 0.5);

  // Refs for interval
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastTickRef = useRef<number>(Date.now());

  // Calculate display values
  const totalDurationMs = selectedDuration * 60 * 1000;
  const elapsedMs = totalDurationMs - remainingMs;
  const minutes = Math.floor(remainingMs / 60000);
  const seconds = Math.floor((remainingMs % 60000) / 1000);
  const milliseconds = remainingMs % 1000;

  // Timer tick logic
  const tick = useCallback(() => {
    const now = Date.now();
    const delta = now - lastTickRef.current;
    lastTickRef.current = now;

    setRemainingMs((prev) => {
      const newValue = Math.max(0, prev - delta);
      if (newValue === 0) {
        // Timer completed
        playComplete();
        setCompletedPomodoros((c) => c + 1);
        setTimerState("idle");
        return selectedDuration * 60 * 1000;
      }
      return newValue;
    });
  }, [selectedDuration, playComplete]);

  // Start/stop interval based on timer state
  useEffect(() => {
    if (timerState === "running") {
      lastTickRef.current = Date.now();
      intervalRef.current = setInterval(tick, 10); // Update every 10ms for smooth ms display
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timerState, tick]);

  // Handle play button
  const handlePlay = () => {
    playClick();
    if (timerState === "running") {
      // Already running, do nothing
      return;
    }
    setTimerState("running");
  };

  // Handle stop button
  const handleStop = () => {
    playClick();
    if (timerState === "running") {
      setTimerState("paused");
    }
  };

  // Handle reset button
  const handleReset = () => {
    playClick();
    setTimerState("idle");
    setRemainingMs(selectedDuration * 60 * 1000);
    setResetActive(true);
    setTimeout(() => setResetActive(false), 600);
  };

  // Handle duration change
  const handleDurationChange = (newDuration: Duration) => {
    playClick();
    setSelectedDuration(newDuration);
    // Only reset if idle or if we want to reset on duration change
    if (timerState === "idle") {
      setRemainingMs(newDuration * 60 * 1000);
    }
  };

  const currentTheme = useThemeStore((state) => state.current);
  const isXpTheme = currentTheme === "xp" || currentTheme === "win98";

  const menuBar = (
    <PomodoroMenuBar
      onClose={onClose}
      onShowHelp={() => setIsHelpDialogOpen(true)}
      onShowAbout={() => setIsAboutDialogOpen(true)}
      onReset={handleReset}
    />
  );

  if (!isWindowOpen) return null;

  return (
    <>
      {!isXpTheme && isForeground && menuBar}
      <WindowFrame
        title={getTranslatedAppName("pomodoro")}
        onClose={onClose}
        isForeground={isForeground}
        appId="pomodoro"
        skipInitialSound={skipInitialSound}
        instanceId={instanceId}
        onNavigateNext={onNavigateNext}
        onNavigatePrevious={onNavigatePrevious}
        menuBar={isXpTheme ? menuBar : undefined}
        windowConstraints={{
          minWidth: 423,
          maxWidth: 423,
          minHeight: 305,
          maxHeight: 305,
        }}
      >
        <div
          className="flex flex-col items-center h-full w-full"
          style={{
            background: "#363636",
            padding: "16px",
          }}
        >
          {/* Flip Clock */}
          <FlipClock
            minutes={minutes}
            seconds={seconds}
            milliseconds={milliseconds}
            completedPomodoros={completedPomodoros}
            totalDuration={selectedDuration * 60}
            elapsed={elapsedMs / 1000}
          />

          {/* Control Buttons Row */}
          <div className="flex items-center gap-[5px] mt-[12px]">
            {/* Duration Lever */}
            <LeverSelector
              value={selectedDuration}
              onChange={handleDurationChange}
              disabled={timerState === "running"}
            />

            {/* Play Button */}
            <ControlButton
              type="play"
              isActive={timerState === "running"}
              onClick={handlePlay}
            />

            {/* Stop Button */}
            <ControlButton
              type="stop"
              isActive={timerState === "paused" || timerState === "idle"}
              onClick={handleStop}
              disabled={timerState === "idle"}
            />

            {/* Reset Button */}
            <ControlButton
              type="reset"
              isActive={resetActive}
              onClick={handleReset}
              autoDeactivateMs={600}
            />
          </div>
        </div>

        <HelpDialog
          isOpen={isHelpDialogOpen}
          onOpenChange={setIsHelpDialogOpen}
          helpItems={translatedHelpItems}
          appId="pomodoro"
        />
        <AboutDialog
          isOpen={isAboutDialogOpen}
          onOpenChange={setIsAboutDialogOpen}
          metadata={appMetadata}
          appId="pomodoro"
        />
      </WindowFrame>
    </>
  );
}

