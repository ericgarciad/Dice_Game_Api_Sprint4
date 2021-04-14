//service a controller y de controler coge a routes. service coge queris de queris.

 const { json } = require('body-parser');
const express = require('express');
 const router = express.Router();
 const modelPlayers = require('../../models/players');
//Listar todos los jugadores

const list = (req, res) => 
    modelPlayers.list().then((response)=>res.json(response))
    .catch((error)=>res.json({error}));

router.get('/all', list)

 module.exports = router;