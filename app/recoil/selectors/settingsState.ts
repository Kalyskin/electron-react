import { atom, selector } from 'recoil';
import { SettingEntity } from '../../electron/quiz/quiz.entity';
import { ipcRequest } from '../../utils/ipcRenderer';

export const updatedAtSettingsState = atom<Date>({
  key: 'updatedAtSettingsState',
  default: new Date(),
});

export const settingsState = selector<SettingEntity[]>({
  key: 'settingsState',
  get: async ({ get }) => {
    get(updatedAtSettingsState);
    return ipcRequest<SettingEntity[]>('quiz/settings', {});
  },
});
