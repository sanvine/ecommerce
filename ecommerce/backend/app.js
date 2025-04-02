const express=require('express')
const app=express()
const dotenv=require('dotenv')
const path=require('path')
dotenv.config({path:path.join(__dirname,'config','config.env')})
const products=require('./routes/product')
const orders=require('./routes/order')
const connectdb=require('./config/connectdb')
const cors=require('cors')

connectdb()

app.use(express.json())

app.use(cors())

app.use('/api/v1/',products)
app.use('/api/v1/',orders)

app.listen(process.env.PORT,()=>{
    console.log(`server running on ${process.env.PORT} in ${process.env.NODE_ENV}`)
})