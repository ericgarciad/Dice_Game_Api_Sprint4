// Comrprobar el ultimo ANONIMO para introducir uno nuevo correctamente
const checkInsert = "SELECT * FROM player WHERE name like '%ANONIMO%' ORDER BY id DESC limit 1;";

// Insertar ANONIMO
const insertAnonimo = "INSERT INTO player (name, date) VALUES (?, CURRENT_TIMESTAMP);";

// Insertar un usuario con un nombre no existente
const insert = "INSERT INTO player (name, date) VALUES (?, CURRENT_TIMESTAMP);";

// Comprobamos si existe el usuario antes de actualizar el nombre
const checkPlayerExist = "SELECT exists(SELECT name FROM player WHERE name=?);";

// Comprobamos el ID del jugador
const checkPlayerExistId = "SELECT exists(SELECT name FROM player WHERE id=?);";

// Actualizamos el nombre del jugador
const update = "UPDATE player SET name = ? WHERE name = ?;";

// Insertamos un juego al tirar los dados
const game = "INSERT INTO game (result, dice_one, dice_two, player_id) VALUES (?, ?, ?, ?);";

// Eliminamos las partidas del jugador seleccionado
const remove = "DELETE FROM game WHERE player_id = ?;";

// Obtenemos el porcentaje de partidas ganadas de los jugadores
const rates = `
    SELECT p.id as ID, p.name as Nombre,
    COUNT(g.result) 'Partidas jugadas',
    ROUND(100 * SUM(g.result = 'WIN') / COUNT(g.result)) 'Porcentaje partidas ganadas'
    FROM game g
    right JOIN player p ON g.player_id = p.id
    GROUP BY p.id;
`;

// Obtenemos todas las partidas de un jugador
const playerGames = `
    SELECT g.id id_game, p.name username, g.dice_one dice_one, g.dice_two dice_two, g.result result
    FROM game AS g
    INNER JOIN player AS p
    ON g.player_id = p.id
    WHERE g.player_id = ?;
`;

// Obtenemos el porcentaje de todas las partidas ganadas de todos los usuarios
const playerPercentage = `
    SELECT p.name,
    ROUND(100 * SUM(g.result = 'WIN') / COUNT(g.result)) winning_percent
    FROM game g
    INNER JOIN player p ON g.player_id = p.id
    GROUP BY g.player_id;
`;

module.exports = {
    insertAnonimo, insert, game, checkPlayerExist, update, remove, rates, playerGames, playerPercentage, checkPlayerExistId, checkInsert
}