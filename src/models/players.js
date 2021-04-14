const bd = require('../config/knex');

const list = () => bd(process.env.T_PLAYERS).select("id")

module.exports = { list };