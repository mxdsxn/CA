import express from 'express'
import { HealthCheckController as Controller } from '@controllers'

const route = express.Router()

route.get('/', (req, res) => Controller.HealthCheck(req, res))

const EasterEggRoute = route
export default EasterEggRoute
