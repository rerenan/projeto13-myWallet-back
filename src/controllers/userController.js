import db from "../db.js";


export async function GetWallet(req,res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.sendStatus(401)
    

    const session = await db.collection('sessions').findOne({ token });
  
    if (!session) {
      return res.sendStatus(401);
    }
    const user = await db.collection("users").findOne({_id: session.userId});
    if(!user) return res.sendStatus(401);
    console.log(user.wallet)
    res.send(user.wallet);
}

export async function PostWallet(req,res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.sendStatus(401)
    

    const session = await db.collection('sessions').findOne({ token });
  
    if (!session) {
      return res.sendStatus(401);
    }
   const user = await db.collection("users").findOne({_id: session.userId});

   await db.collection("users").updateOne({_id: session.userId},{ $set: {wallet: [...user.wallet, req.body]}})

   res.sendStatus(201);
}