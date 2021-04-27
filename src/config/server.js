const mysql = require('mysql');

const connection = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1", // host
  user: "root", // usuario
  password: "root", // password
  database: 'dicegame'  // nombre de la base de datos
});

module.exports = connection;