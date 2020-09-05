import express from 'express'
import { EasterEggController as Controller } from '@controllers'

const route = express.Router()

route.get('/easter-egg', async (req, res) => await Controller.easterEgg(req, res))

const EasterEggRoute = route
export default EasterEggRoute
