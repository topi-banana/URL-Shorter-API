import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()

import { db, r2h, kanaToHira, exec, sleep, pr, __dirname } from './functions.js'

app.use((req,res,next)=>{
    console.log( `${(new Date()).toLocaleString()}\tGET\t${req.originalUrl}` )
    next()
})

//app.use('/file', express.static('./file'))

app.get('/request/', (req, res) => {
    return res.json({
        status: 200,
        type: option.type,
        url: fileUrl,
        info: info.return,
    })
})

app.get('/get/', (req, res) => {
    return res.json({
        status: 200,
        type: option.type,
        url: fileUrl,
        info: info.return,
    })
})

app.listen(8080, async () => {
    const response = await db.init()
    response.status
    console.log( `${(new Date()).toLocaleString()}\tstart` )
})