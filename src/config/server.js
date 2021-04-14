const express = require('express');
const app = express();
var mysql = require('mysql');

class ServerMySql {
    constructor(host, port, user, password) {
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
        var con = mysql.createConnection({
            host: this.host,
            port: this.port,
            user: this.user,
            password: this.password
        });
        con.connect(function (err) {
            if (err)
                throw err;
            console.log("Connected!");
        });
        // Usamos el puerto 8000 y mostramos un mensaje por consola para saber que el servidor está funcionando
        app.listen(8000, function () {
            console.log("Server is running");
            console.log("The GAME is ready");
        });
    }
}
module.exports = ServerMySql;
