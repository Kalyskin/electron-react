import { app } from 'electron';
import path from 'path';
import * as fs from 'fs';

export const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'resources')
  : path.join(__dirname, '../../resources');

export const SQLITE_FILE = app.isPackaged
  ? path.join(app.getPath('userData'), 'db.sqlite')
  : path.join(RESOURCES_PATH, 'db.sqlite');

export const USER_IMAGES_PATH = path.join(app.getPath('userData'), 'images');

if (!fs.existsSync(USER_IMAGES_PATH)) {
  fs.mkdirSync(USER_IMAGES_PATH);
}
