//Import npm packages
const express=require('express')
const path = require('path')
// const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app=express()
const PORT = process.env.PORT || 8080
const routes = require('./routes/api')

// const url = 'mongodb://127.0.0.1:27017/dbtesting'
// const url = 'mongodb+srv://roomhost:Wowapassword!@escaperoomdb.yktnj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// mongoose.connect(process.env.MONGODB_URI || url, {
//     useNewUrlParser: true,
//     useUnifiedTopology : true 
// })
// const db = mongoose.connection
// db.on("connected",()=>{
//     console.log("connected to mongodb")
// })
// db.on("error",()=>{
//     console.log("Error")
// })




//HTTPREQUESTLOGGER
// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(morgan('tiny'))
app.use('/',routes)


//HEROKUSETUP
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`))