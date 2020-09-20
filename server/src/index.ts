import 'dotenv/config'
import server from './server'

const port = process.env.PORT || 1111

server.listen(port, () => console.log(`listening on http://localhost:${port}`))
