const { ipcRenderer } = require('electron');

export const ipcRequest = <T>(channel: string, data: any) => {
  return new Promise<T>((resolve, reject) => {
    const errorListener = (_, res: any) => {
      reject(JSON.parse(res));
      console.log(`${channel}-error`, res);
      ipcRenderer.removeAllListeners(`${channel}-reply`);
    };
    const replyListener = (_, res) => {
      resolve(JSON.parse(res));
      console.log(`${channel}-reply`, res);
      ipcRenderer.removeAllListeners(`${channel}-error`);
    };
    ipcRenderer.once(`${channel}-reply`, replyListener);
    ipcRenderer.once(`${channel}-error`, errorListener);
    ipcRenderer.send(`${channel}-message`, JSON.stringify(data));
    console.log(`${channel}-message`, data);
  });
};
