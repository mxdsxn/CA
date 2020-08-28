/* eslint-disable no-unused-vars */
import { HealthCheckService as Service } from '@services'
import libUtc from '@libUtc'
import { Request, Response } from 'express'

const HealthCheck = async (req: Request, res: Response) => {
  res.status(200)
  return res.json({ message: 'bem vindo à api do cadastro de atividades dextra' })
}

export default { HealthCheck }
