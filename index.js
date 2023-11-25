import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

import { connectToDB } from './connection.js'

import userRoutes from './routes/user.js'
import fingersRoutes from './routes/fingers.js'
import playerRoutes from './routes/player.js'
import questionRoutes from './routes/question.js'

const app = express();
const server = http.createServer(app)
const port = process.env.PORT || 4000;

app.use(cors({ origin: "*" }));
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

connectToDB();

app.use("/user", userRoutes)
app.use("/fingers", fingersRoutes)
app.use("/player", playerRoutes)
app.use("/question", questionRoutes)

server.listen(port, () => console.log(`SERVER IS RUNNING`))