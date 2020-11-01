const { ipcRenderer } = require('electron');

export const ipcRequest = (channel: string, data: any) => {
  return new Promise((resolve, reject) => {
    const errorListener = (_, res: any) => {
      reject(JSON.parse(res));
      ipcRenderer.removeAllListeners(`${channel}-reply`);
    };
    const replyListener = (_, res) => {
      resolve(JSON.parse(res));
      ipcRenderer.removeAllListeners(`${channel}-error`);
    };
    ipcRenderer.once(`${channel}-reply`, replyListener);
    ipcRenderer.once(`${channel}-error`, errorListener);
    ipcRenderer.send(`${channel}-message`, JSON.stringify(data));
  });
};
