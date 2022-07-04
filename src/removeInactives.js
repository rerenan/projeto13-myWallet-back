import db from "./db.js"

export default async function removeInactives(){
    const TWO_MINUTES = 2*60*1000
    await db.collection('sessions').deleteMany({lastStatus:{$lt: (Date.now()-TWO_MINUTES)}})
    
}