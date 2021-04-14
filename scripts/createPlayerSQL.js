const createPlayerSQL = 'CREATE TABLE player (id_player INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, username VARCHAR(40) DEFAULT "ANONIM" NOT NULL UNIQUE, sign_up_date TIMESTAMP NOT NULL);'

module.exports = createPlayerSQL;