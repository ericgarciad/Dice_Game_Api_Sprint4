const expressLoader = require('../../loaders/expressModule') //Modulos express en Loaders (express, app, router)
const service = require('../../services/service');

/* ROUTES */
// Para optimizar el codigo y no repetir el try catch (siendo el catch igual para todos) creamos esta funcion
// routeHelper que rebice un callback que es el codigo individual que implementa cada route y lo generamos
// de esta manera queda todo más limpio.
function routeHelper(callback) {
    return async (req, res) => {
        try {
            await callback(req, res);
        } catch (error) {
            res.status(400)
                .send({
                    success: false,
                    error: error
                });
        }
    }
}

// Crea un jugador
expressLoader.router.post('/players', routeHelper(async (req, res) => {
    // En el caso de que no se introduzca un nombre se añadira el nombre de usuario ANONIMO
    if (req.body.username === "") {
        await service.insertAnonimo();
        res.json({
            success: true,
            message: 'Usuario <Anonimo> creado correctamente'
        });
    } else {
        // Insertamos un jugador con un nombre no repetido
        let username = req.body.username;
        await service.insertPlayer(username);
        res.json({
            success: true,
            message: 'Usuario creado correctamente'
        });
    }
}));

// Modifica el nombre del jugador
expressLoader.router.put('/players', routeHelper(async (req, res) => {
    // Recogemos el antiguo nombre y el nuevo, comprobamos si existe el nuevo nombre y si no es así, lo actualizamos
    let old_username = req.body.old_username;
    let new_username = req.body.new_username;
    // Comprobamos que el nombre nuevo no exista
    let userArr = await service.checkPlayer(old_username, new_username);
    // Actualizamos el nombre
    await service.updatePlayer(userArr);
    res.json({
        success: true,
        message: 'El nombre del jugador se ha actualizado correctamente'
    });
}));

// Un jugador especifico realiza una tirada de dados
expressLoader.router.post('/players/:id/games', routeHelper(async (req, res) => {

    let player_id = req.params.id;
    //Envamos el player_id a la función checkPlayerInsertRoll
    var checkResult = await service.checkPlayerInsertRoll(player_id);

    if (checkResult == 1) {
        let result = await service.insertDiceRoll(player_id);
        res.json({
            success: true,
            message: "Resultado partida: " + result
        });
    } else {

        res.json({
            success: false,
            message: "El jugador introducido no exite, por favor introduzca un jugador existente o cree uno nuevo"
        });
    }
}));

// Elimina las tiradas del jugador
expressLoader.router.delete('/players/:id/games', routeHelper(async (req, res) => {

    let player_id = req.params.id;
    let existingId = await service.checkPlayerId(player_id);
    await service.removeGames(existingId);
    res.json({
        success: true,
        message: 'Se han eliminado todas las tiradas del jugador seleccionado'
    });
}));

// Devuelve el listado de todos los jugadores del sistema con su 
// porcentaje medio de exitos.
expressLoader.router.get('/players', routeHelper(async (req, res) => {

    let jugadores = await service.getWinRate()
    res.json({
        success: true,
        'Jugadores': jugadores
    });

}));

// Devuelve el listado de jugadas de un jugador
expressLoader.router.get('/players/:id/games', routeHelper(async (req, res) => {

    let player_id = req.params.id;
    let playerGames = await service.getGames(player_id)
    res.json({
        success: true,
        games: playerGames
    });
}));

// Devuelve el ranking medio de todos los jugadores del sistema
// es decir, el porcentaje medio de exitos.
expressLoader.router.get('/players/ranking', routeHelper(async (req, res) => {

    let result = await service.getAverage();
    res.json({
        success: true,
        message: `Porcentaje medio de todos los ganadores: ${result}%`
    });
}));

// Deuvelve el jugador con peor porcentaje de exito
expressLoader.router.get('/players/ranking/loser', routeHelper(async (req, res) => {

    let loser = await service.getLoser();
    res.json({
        success: true,
        loser: loser
    });
}));

// Devuelve el jugador con mejor porcentaje de exito.
expressLoader.router.get('/players/ranking/winner', routeHelper(async (req, res) => {

    let winner = await service.getWinner();
    res.json({
        success: true,
        winner: winner
    });
}));

// Routes
expressLoader.app.use(expressLoader.express.json());
expressLoader.app.use(expressLoader.router);
// Usamos el puerto 8000 y mostramos un mensaje por consola para saber que el servidor está funcionando
expressLoader.app.listen(8000, function () {
    console.log("");
    console.log("El servidor se esta ejecutando");
    console.log("El juego de los dados esta listo");

})