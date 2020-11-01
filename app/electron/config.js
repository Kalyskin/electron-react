import { app } from 'electron';
import path from 'path';

export const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'resources')
  : path.join(__dirname, '../../resources');

export const SQLITE_FILE = path.join(RESOURCES_PATH, 'db.sqlite');
