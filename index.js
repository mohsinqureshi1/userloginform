const express=require("express")
const mongoose=require("mongoose")
const db=require("./api/DB connection/DB")
const app=express()

const router=require('./api/Routes/routes')
const cors = require("cors");
app.use(express.json())
db();
//middelware body parser


app.use((req,res ,next)=>{
console.log("HTTP method,"+ req.method + " URL ,"+req.url);
next();

})

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));

app.use('/api',router)


app.listen(4000,()=>console.log("server is running"))