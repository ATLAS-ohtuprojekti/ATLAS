const express = require('express')
const app = express()
const gridRouter = require('express').Router()
const Grid = require('../controllers/grid')
const grid = new Grid()


app.get('/', grid.getAll())
app.get('/:gridId', grid.getGridInfo())
app.get('/:gridId/atlas')
app.get('/:gridId/atlas/:atlasId')
app.get('/:gridId/stats', grid.getGridStats())
app.get('/:gridId/stats/:atlasId')

module.exports = gridRouter