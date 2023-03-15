/*
import { Client, GatewayIntentBits, Partials, EmbedBuilder, WebhookClient, Colors } from 'discord.js'
const webhookClient = new WebhookClient({ url: process.env.LOG_WHEBHOOK })
*/

import mysql from 'mysql2/promise'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const db_setting = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};
let db_connection
const db = {
    init : async() => {
        try {
            db_connection = await mysql.createConnection(db_setting)
            pr.info(`Start SQL`)
            return {
                status: true
            }
        }catch(e){
            pr.err(`Start  SQL`)
            pr.err(e)
            return {
                status: false,
                content: 'Failure: DB init',
                detail: e,
            }
        }
    },
    exec : async(sql) => {
        try {
            const result = await db_connection.execute(sql)
            pr.info(`${sql}`,`SQL`)
            console.log(result[0])
            //pr.whi(client.user, `SQL ${sql}`, result[0])
            return {
                status: true,
                result: result[0]
            }
        }catch(e){
            pr.err(`${sql}`,`SQL`)
            console.error(e)
            //pr.whe(client.user, `SQL ${sql}`, e)
            return {
                status: false,
                content: `Failure: DB exec`,
                sql: sql,
                detail: e,
            }
        }
    },
    stop : async() => {
        try {
            const result = await db_connection.end()
            pr.info(`SQL exit`)
            //pr.whi(client.user, `SQL exit`)
            return {
                status: true,
                result: result
            }
        }catch(e){
            pr.err(`SQL exit`)
            console.error(e)
            //pr.whi(client.user, `SQL exit`, e)
            return {
                status: false,
                content: 'Failure: DB stop',
                detail: e,
            }
        }
    }
}

import util from 'util'
import childProcess from 'child_process'
const exec = util.promisify(childProcess.exec)

const pr = {
    info: (str,ex) => {
        console.log(`\x1b[32mINFO\x1b[0m: ${new Date() .toLocaleString()}\t${ ex ? `${ex} ` : `` }- "\x1b[1m${str}\x1b[0m"`)
        /*pr.webhook( new EmbedBuilder()
            .setTitle('INFO')
            .setColor(Colors.Green)
            .addFields(
                {name:str, value:ex}
            )
            .setAuthor({ name: user.username, iconURL: user.avatarURL() })
            .setTimestamp()
        )*/
    },
    err: (str,ex) => {
        console.log(`\x1b[31mERROR\x1b[0m: ${new Date() .toLocaleString()}\t${ ex ? `${ex} ` : `` }- "\x1b[1m${str}\x1b[0m"`)
        /*pr.webhook( new EmbedBuilder()
            .setTitle('ERROR')
            .setColor(Colors.Red)
            .addFields(
                {name:str, value:ex}
            )
            .setAuthor({ name: user.username, iconURL: user.avatarURL() })
            .setTimestamp()
        )*/
    },
    webhook: (embed) => {
        webhookClient.send({
            // content: '',
            username: process.env.APP_NAME,
            // avatarURL: '',
            embeds: [embed],
        })
    }
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

import crypto from 'crypto'
const getRandom = (N=16) => {
    const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    return Array.from(crypto.randomFillSync(new Uint8Array(N))).map((n)=>S[n%S.length]).join('')
}
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export { db, exec, sleep, getRandom, pr, __dirname }