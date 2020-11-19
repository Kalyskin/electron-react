import * as fs from 'fs';

export const saveBase64File = (imageData: string, destinationPath) =>
  new Promise((resolve, reject) => {
    const base64Data = imageData.replace(/^data:image\/png;base64,/, '');
    fs.writeFile(destinationPath, base64Data, 'base64', (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
