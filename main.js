import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()

import { db, exec, sleep, getRandom, pr, __dirname } from './functions.js'

app.use((req,res,next)=>{
    pr.info(req.originalUrl,`GET`)
    next()
})

//app.use('/file', express.static('./file'))

app.get('/request/', async (req, res) => {
    const id = getRandom(4)
    var {result,status} = await db.exec(`select * from link where id='${id}'`)
    if(!status){
        return res.json({
            status: 500,
            detail: 'DBエラー',
        })
    }
    if(result.length){
        return res.json({
            status: 500,
            detail: '同じコードがすでに存在します。',
        })
    }
    var {result,status} = await db.exec(`INSERT INTO link (id,url,timestamp) VALUES ('${id}','${req.query.url}','${new Date().toLocaleString('sv-SE')}')`)
    if(!status){
        return res.json({
            status: 500,
            detail: 'DBエラー',
        })
    }
    return res.json({
        status: 200,
        id: id,
        //url: new URL(`/${id}`, `${req.protocol}://${req.get('host')}${req.originalUrl}`),
        originalUrl: req.query.url,
    })
})

app.get('/get/:id', async (req, res) => {
    var {result,status} = await db.exec(`select * from link where id='${req.params.id}'`)
    if(!status){
        return res.json({
            status: 500,
            detail: 'DBエラー',
        })
    }
    if(!result.length){
        return res.json({
            status: 404
        })
    }
    return res.json({
        status: 200,
        id: result[0].id,
        originalUrl: result[0].url
    })
})

app.listen(8080, async () => {
    await db.init()
    pr.info(`Start`,`HTTP`)
})