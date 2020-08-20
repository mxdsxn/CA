import { HealthCheckService as Service } from '@services'
import libUtc from '@libUtc'

const HealthCheck = async (req, res) => {
    return res.json({ message: 'bem vindo à api do cadastro de atividades dextra' })
}

export default { HealthCheck }