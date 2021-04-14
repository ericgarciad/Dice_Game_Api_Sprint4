// Punto de entrada a la aplicación

const ServerMySql = require("./src/config/server");

// let server = new ServerMySql("host",port, "user", "password")
server = new ServerMySql("127.0.0.1", 3306, "root", "");

function startServer() {
    return server;
}
startServer();
