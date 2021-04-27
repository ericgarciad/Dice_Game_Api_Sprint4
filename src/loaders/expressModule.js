// En este .js ponemos los modulos relacionados con express para que quede
// más limpio el código

const express = require('express');
const app = express();
const Router = require('express');
const router = Router();

module.exports = { express, app, router };