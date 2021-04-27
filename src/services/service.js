const db = require('../config/server');
// Utilizamos accessModels como capa intermedia para acceder a models donde estan todas las sentencias SQL
const accessModels = require('../accessModels/accessModels');

// Insertar un usuario ANONIMO
const insertAnonimo = () => {

    return new Promise((resolve, reject) => {
        db.query(accessModels.queryCheckInsertAnonimo, (err, row, fields) => {
            // Recorremos el listado de nombres para obtener numero del ultimo ANONIMO introducido
            for (player of row) {
                var name = player.name;
                //console.log("0 " + name)
                // Cortamos el numero del nombre ANONIMO- así obtenemos el numero del ultimo ANONIMO
                var idLastAnonim = name.split("ANONIMO-")[1];
            }
            //console.log("1 " + idLastAnonim)
            // Convertimos el numero que hemos cortado en un INT
            let idInt = parseInt(idLastAnonim);
            //console.log("2 " + idInt)

            // Al numero del ultimo ANONIMO le sumamos 1
            let id = idInt + 1;
            //console.log("3 " + id)

            //Concatenamos la palabra ANONIMO- + el id+1 del ultimo ANONIMO
            let anonymousName = "ANONIMO-" + id;
            //console.log("4 " + anonymousName);
            //Controlamos posibles errores
            if (anonymousName == "ANONIMO-NaN") {
                anonymousName = "ANONIMO-1";
            }
            // Insertamos el nombre del nuevo ANONIMO con query.insertAnonimo
            db.query(accessModels.queryInsertAnonimo, anonymousName, (err, row, fields) => {
                console.log("Jugador anonimo creado: " + anonymousName)
                if (!err) {
                    resolve();
                } else {
                    reject('Error al introducir el usuario ANONIMO');
                }
            })
        })

    })
}

// Insertamos un usuario, el qual que no exista el mismo nombre introducido
const insertPlayer = (username) => {
    return new Promise((resolve, reject) => {
        db.query(accessModels.queryInsertPlayer, username, (err, row, fields) => {
            if (!err) {
                resolve(username);
                console.log("Jugador personalziado creado: " + username)
            } else {
                reject('El usuario ya existe, utiliza otro nombre');
            }
        })
    })
}

// Jugar al juego de los dados
const rollDices = () => {
    //Utilizamos la funcion random para obtener un numero aleatorio
    let diceOne = Math.floor(Math.random() * 6) + 1;
    let diceTwo = Math.floor(Math.random() * 6) + 1;
    // Devuelve un array con los dos numeros obtenidos entre los dos dados
    let dices = [diceOne, diceTwo];
    return dices;
}

const checkPlayerInsertRoll = (player_id) => {
    return new Promise((resolve, reject) => {
        db.query(accessModels.queryCheckPlayerExistId, player_id, (err, row, fields) => {
            // Devolvemos el resultado a la capa de routes mediante getCheckPlayer para validar si existe el usuario cuando jugamos a un juego
            let queryName = fields[0].name;
            let result = row[0][queryName];
            resolve(result)
        })
    })
}

// Insertar el resultado de lanzar los dados
const insertDiceRoll = (player_id) => {
    return new Promise((resolve, reject) => {
        let dicesArray = rollDices();
        let result = '';
        // Comrpobamos si el jugador ha ganado o ha perdido
        if (dicesArray[0] + dicesArray[1] === 7) {
            result = 'WIN';
        } else {
            result = 'LOSE';
        }

        db.query(accessModels.queryGame, [result, dicesArray[0], dicesArray[1], player_id], (err, row, fields) => {
            if (!err) {
                if (result === 'WIN' || result === 'LOSE') {
                    resolve(result)
                } else {
                    reject(`Error al tirar los dados, vuelve a intentarlo`);
                }
            } else {
                reject(err)
            }
        })
    })
}

// Comprobamos si el nombre del jugador ya existe mediante los parametros old y new
const checkPlayer = (old_username, new_username) => {
    return new Promise((resolve, reject) => {
        db.query(accessModels.queryCheckPlayerExist, old_username, (err, row, fields) => {
            if (!err) {
                let queryName = fields[0].name;
                let result = row[0][queryName];
                if (result === 1) {
                    let userArr = [old_username, new_username];
                    resolve(userArr);
                } else {
                    reject('El usuario introducido en OLD no existe');
                }
            } else {
                reject(err);
            }
        })
    })
}

// Comrpobamos si existe un jugador mediante el ID
const checkPlayerId = (id) => {
    console.log(id)
    return new Promise((resolve, reject) => {
        console.log(id)

        db.query(accessModels.queryCheckPlayerExistId, id, (err, row, fields) => {
            console.log(id)

            if (!err) {
                // the query returns 1 if player exists and 0 if it doesn't
                let queryName = fields[0].name;
                let result = row[0][queryName];
                if (result === 1) {
                    resolve(id);
                } else {
                    reject('El ID de Usuario no ha sido encontrado');
                }
            } else {
                reject(err);
            }
        })
    })
}

// Actualizamos un jugador el qual se ha comrpboado si existe previamente
// en el archivo players.js en el PUT primero comprobamos si existe y si es correcto realizamos updatePlayer
const updatePlayer = (userArr) => {
    return new Promise((resolve, reject) => {
        db.query(accessModels.queryUpdate, [userArr[1], userArr[0]], (err, row, fields) => {
            if (!err) {
                resolve('El nombre del usuario se ha actualziado correctamente');
            } else {
                reject(err);
            }
        })
    })
}

// Eliminamos las tiradas de un jugador
const removeGames = (player_id) => {
    console.log(player_id)
    return new Promise((resolve, reject) => {
        console.log(player_id)

        db.query(accessModels.queryRemove, player_id, (err, row, fields) => {
            console.log(player_id)

            if (!err) {
                resolve('Todas las tiradas del jugador seleccionado han sido eliminador');
            } else {
                reject('El usuario introducido no se ha encontrado');
            }
        })
    })
}

// Obtenemos el listados de todos los jugadores con su porcentaje de partidas ganadas o perdidas
const getWinRate = () => {
    return new Promise((resolve, reject) => {
        db.query(accessModels.queryRates, (err, row, fields) => {
            if (!err) {
                if (row.length > 0) {
                    resolve(row);
                } else if (row.length === 0) {
                    reject('No existen jugadores, por favor cree un jugador')
                }
            } else {
                reject(err);
            }
        })
    })
}

// Tiradas de un jugador en concreto
const getGames = (player_id) => {
    return new Promise((resolve, reject) => {
        db.query(accessModels.queryPlayerGames, player_id, (err, row, fields) => {
            if (!err) {
                if (row.length > 0) {
                    resolve(row);
                } else if (row.length === 0) {
                    reject('El jugador no existe o no ha jugado al juego todavia')
                }
            } else {
                reject(err);
            }
        })
    })
}


// Promedio de exito medio de todas las partidas ganadas
const getAverage = () => {
    return new Promise((resolve, reject) => {
        db.query(accessModels.queryRates, (err, row, fields) => {
            if (!err) {
                let arrayOfPercentages = row.map(obj => obj.winning_percent);
                let averageRate = (arrayOfPercentages.reduce((a, b) => a + b) / arrayOfPercentages.length).toFixed(2);
                if (averageRate == 0.00) {
                    reject('Nobody won so far..');
                } else {
                    resolve(averageRate);
                }
            } else {
                reject(err);
            }
        })
    })
}

// Mostrar el porcentaje de partidas ganadas de los jugadores
const getWinner = () => {
    return new Promise((resolve, reject) => {
        db.query(accessModels.queryPlayerPercentatge, (err, row, fields) => {
            if (!err) {
                let winningPlayer = row.reduce((max, currentPlayer) => max.winning_percent > currentPlayer.winning_percent ? max : currentPlayer);
                if (winningPlayer.winning_percent === 0) {
                    reject('No existen jugadores que hayan ganado');
                } else {
                    resolve(winningPlayer);
                }
            } else {
                reject(err);
            }
        })
    })
}

// Mostrar el porcentaje de partidas perdidas de los jugadores
const getLoser = () => {
    return new Promise((resolve, reject) => {
        db.query(accessModels.queryPlayerPercentatge, (err, row, fields) => {
            if (!err) {
                // Obtenemos jugadores que tengan puntos positivos para poder filtrar por los que tienen menos puntos
                let playerWithPoints = row.filter(player => player.winning_percent > 0);
                let looser = playerWithPoints.reduce((min, currentPlayer) => min.winning_percent < currentPlayer.winning_percent ? min : currentPlayer);
                if (looser.winning_percent === 0) {
                    reject('No existen partidas perdidas');
                } else {
                    resolve(looser);
                }
            } else {
                reject(err);
            }
        })
    })
}


module.exports = {
    rollDices, insertAnonimo, insertPlayer,
    insertDiceRoll, updatePlayer, checkPlayer, checkPlayerId, removeGames, getWinRate, getGames,
    getAverage, getWinner, getLoser, checkPlayerInsertRoll
};