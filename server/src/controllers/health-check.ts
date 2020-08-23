import { HealthCheckService as Service } from '@services'
import libUtc from '@libUtc'
import { Request, Response } from 'express'

const HealthCheck = async (req: Request, res: Response) => {
  return res.json({ message: 'bem vindo à api do cadastro de atividades dextra' })
}

export default { HealthCheck }
