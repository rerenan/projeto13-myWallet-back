import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import db from "../db.js";
import { postWalletSchema } from "../schemas.js";

export async function GetWallet(req,res){
    
  const session = res.locals.session
    const user = await db.collection("users").findOne({_id: session.userId});
    if(!user) return res.sendStatus(401);
    const response = {
      name:user.name,
      wallet: user.wallet
    }
    res.send(response);
}

export async function PostWallet(req,res){
  const session = res.locals.session
  const {error} = postWalletSchema.validate(req.body)
  dayjs.extend(utc)
  dayjs.extend(timezone)
  const operation = {... req.body, date: dayjs().tz("America/Sao_Paulo").format('DD/MM') } 
  if(error) return res.sendStatus(422)
    
   const user = await db.collection("users").findOne({_id: session.userId});

   await db.collection("users").updateOne({_id: session.userId},{ $set: {wallet: [...user.wallet, operation]}})

   res.sendStatus(201);
}

export async function SendStatus(req,res){
  const session = res.locals.session

  await db.collection("session").updateOne({session},{$set: {lastStatus: Date.now()}})
  res.sendStatus(200);
}