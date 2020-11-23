import { atom } from 'recoil';

interface TimerState {
  startTime: number;
  totalMinutes: number;
}

export const timerState = atom<TimerState>({
  key: 'timerState',
  default: {
    startTime: Date.now(),
    totalMinutes: 0,
  },
});
