import { useRecoilState } from 'recoil';
import { useCallback, useEffect, useState } from 'react';
import { timerState } from '../recoil/atoms/timerState';

export const useTimer = (callback?: () => void) => {
  const [{ startTime, totalMinutes }, setTimerState] = useRecoilState(
    timerState
  );
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (totalMinutes > 0) {
      const id = setInterval(() => {
        const totalSeconds = totalMinutes * 60;
        const delta = Date.now() - startTime;
        if (totalSeconds - Math.floor(delta / 1000) > 0) {
          setSeconds(totalSeconds - Math.floor(delta / 1000));
        } else {
          if (callback) callback();
          clearInterval(id);
        }
      }, 1000);
      return () => clearInterval(id);
    }
    return undefined;
  }, [startTime, totalMinutes, callback]);

  const start = useCallback(
    (totalMin: number) => {
      setTimerState({
        totalMinutes: totalMin,
        startTime: Date.now(),
      });
    },
    [setTimerState]
  );

  return {
    fullTime: new Date(seconds * 1000).toISOString().substr(11, 8),
    start,
    seconds,
  };
};
