const path = require('path');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../../resources/db.sqlite'),
  },
  useNullAsDefault: true,
  migrations: {
    tableName: 'migrations',
    directory: path.join(__dirname, 'migrations'),
  },
  seeds: {
    directory: path.join(__dirname, 'seeds'),
  },
};

module.exports = knexConfig;
