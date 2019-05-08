const env = process.env.NODE_ENV;

let MYSQL_CONF;

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'Mysql_2018',
    port: '3306',
    database: 'myblog'
  };
}

if (env === 'producton') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'Mysql_2018',
    port: '3306',
    database: 'myblog'
  };
}

module.exports = {
  MYSQL_CONF
};
