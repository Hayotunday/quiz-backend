import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'

import { connectToDB } from './connection.js'

import userRoutes from './routes/user.js'
import playerRoutes from './routes/player.js'
import questionRoutes from './routes/question.js'

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: "*" }));
app.use(express.json());

connectToDB();

app.use("/user", userRoutes)
app.use("/player", playerRoutes)
app.use("/question", questionRoutes)
// app.use("/auth", authRoutes)

app.listen(port, () => console.log(`SERVER RUNNING`))