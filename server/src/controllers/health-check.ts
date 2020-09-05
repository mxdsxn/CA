/* eslint-disable no-unused-vars */
import { HealthCheckService as Service } from '@services'
import libUtc from '@libUtc'
import { Request, Response } from 'express'

const HealthCheck = async (req: Request, res: Response) => {
  return (await Service.HealthCheck())
}

export default { HealthCheck }
