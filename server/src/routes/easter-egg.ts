import express from 'express'
import { EasterEggController as Controller } from '@controllers'

const route = express.Router()

route.get('/EasterEgg/teste', (req, res) => Controller.Teste(req, res))

const EasterEggRoute = route
export default EasterEggRoute
