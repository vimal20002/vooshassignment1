import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import { connnectToDb } from "./db.js"
import { authMiddleWare } from "./middlewares/auth.js"
import todosRoutes from './routes/todoRoutes.js'
import authRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv';
import xssClean from 'xss-clean';
import helmet from 'helmet';
// import './config/passport.js'; // Import Passport configuration

const app = express()
dotenv.config();

app.use(cors())
app.use(bodyParser.json())
// Use Helmet to set various HTTP headers for security
app.use(helmet());

// Use xss-clean to sanitize user input
app.use(xssClean());

app.use('/auth', authRoutes);
app.use('/todos', authMiddleWare, todosRoutes);

//Connecting to mongodb
connnectToDb()

//where our backend will run
const PORT = process.env.PORT || 7000;
app.listen(PORT, ()=>{
    console.log(`Connected at ${PORT}`)
})