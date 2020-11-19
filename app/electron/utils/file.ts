import * as fs from 'fs';

export const saveBase64File = (imageData: string, destinationPath: string) =>
  new Promise((resolve, reject) => {
    const base64Data = imageData.replace(/^data:image\/png;base64,/, '');
    fs.writeFile(destinationPath, base64Data, 'base64', (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });

export const readBase64Image = (path: string) =>
  fs.promises.readFile(path, { encoding: 'base64' });

export const saveBufferFile = (buffer: Buffer, destinationPath: string) =>
  new Promise((resolve, reject) => {
    fs.writeFile(destinationPath, buffer, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
