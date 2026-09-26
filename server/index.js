import express from 'express'

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use((request, response, next) => {
  const allowedOrigin = process.env.FRONTEND_URL || '*'
  response.setHeader('Access-Control-Allow-Origin', allowedOrigin)
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  if (request.method === 'OPTIONS') return response.sendStatus(204)
  next()
})

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.post('/api/calculate', (request, response) => {
  const { first, second, operation } = request.body

  if (!Number.isFinite(first) || !Number.isFinite(second)) {
    return response.status(400).json({ error: 'Both values must be valid numbers.' })
  }

  if (operation !== 'add' && operation !== 'subtract') {
    return response.status(400).json({ error: 'Operation must be add or subtract.' })
  }

  const result = operation === 'add' ? first + second : first - second
  return response.json({ first, second, operation, result })
})

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`)
})