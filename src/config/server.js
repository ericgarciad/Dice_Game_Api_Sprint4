const express = require('../loaders/expressModule')
const app = express();
const mysql = require('../loaders/mysqlModule')
const knex = require('knex');
const dotenv = require('dotenv');
dotenv.config();
const player = require('../api/routes/player')

class ServerMySql {
    constructor(host, port, user, password) {
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;

        const conectionDB = {
                host: this.host,
                port: this.port,
                user: this.user,
                password: this.password
            }
            
          // connect without mysql
          var knex = require('knex')({ client: 'mysql', connection: conectionDB });
        
          
          knex.raw('CREATE DATABASE dicegame').then(function () {
            knex.destroy();
          
            // connect with database dicegame
            conectionDB.database = 'dicegame';
            knex = require('knex')({ client: 'mysql', connection: conectionDB });
          
            knex.schema
              .createTable('player', function (table) {
                table.string('id');
              })
              .then(function () {
                knex.destroy();
              });
          });


        /////////////////////

        app.use("/player", player);
        /*
                con.connect(function (err) {
                    if (err)
                        throw err;
                    console.log("Connected!");
                });
        */
        // Usamos el puerto 8000 y mostramos un mensaje por consola para saber que el servidor está funcionando
        app.listen(8000, function () {
            console.log("Server is running");
        });
    }
}
module.exports = ServerMySql;
