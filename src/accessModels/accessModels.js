const query = require('../models/diceGame');

var queryCheckInsertAnonimo = query.checkInsert;
var queryInsertAnonimo = query.insertAnonimo;
var queryInsertPlayer = query.insert;
var queryGame = query.game;
var queryCheckPlayerExist = query.checkPlayerExist;
var queryCheckPlayerExistId = query.checkPlayerExistId;
var queryUpdate = query.update;
var queryRemove = query.remove;
var queryRates = query.rates;
var queryPlayerGames = query.playerGames;
var queryPlayerPercentatge = query.playerPercentage;


module.exports = { queryCheckInsertAnonimo, queryInsertAnonimo, queryInsertPlayer, queryGame, queryCheckPlayerExist, queryCheckPlayerExistId, queryUpdate, queryRemove, queryRates, queryPlayerGames, queryPlayerPercentatge };