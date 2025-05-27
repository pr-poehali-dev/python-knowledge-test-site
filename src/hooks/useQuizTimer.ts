import { useState, useEffect } from "react";

export const useQuizTimer = (
  isStarted: boolean,
  isCompleted: boolean,
  onTimeUpdate: (time: number) => void,
) => {
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    if (isStarted && !isCompleted) {
      setStartTime(Date.now());
    }
  }, [isStarted, isCompleted]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStarted && !isCompleted && startTime > 0) {
      interval = setInterval(() => {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        onTimeUpdate(timeSpent);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, isCompleted, startTime, onTimeUpdate]);

  return { startTime };
};
