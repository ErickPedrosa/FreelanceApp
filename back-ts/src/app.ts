import express from 'express'
import userRoutes from './routes/userRoutes'
import { setupSwagger } from './utils/swagger'


const app = express()


app.use(express.json())
app.use('/api/v1', userRoutes)
setupSwagger(app)


app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


export default app