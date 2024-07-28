import express from 'express'
import dotenv from 'dotenv'
import cors from "cors";
import adminRouter from './routes/admin.js'
import userRouter from './routes/user.js'
import devRouter from './routes/dev.js'

const app = express()

app.use(cors({
    // origin:'http://localhost:5173',
    credentials:true
}));
app.use(express.json())
dotenv.config();
app.get('/',(req,res)=>{
    return res.json({
        message:"Hello World"
    })
})
app.use(`${process.env.URL}/admin`, adminRouter)
app.use(`${process.env.URL}/user`, userRouter)
app.use(`${process.env.URL}/dev`, devRouter)

app.get('*',(req,res)=>{
    return res.json({
        message:"PAGE NOT FOUND"
    })
})
app.listen(process.env.PORT,'0.0.0.0', () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
