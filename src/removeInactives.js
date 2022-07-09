import db from "./db.js"

export default async function removeInactives(){
    const TWO_MONTHS = 60*24*60*60*1000
    await db.collection('sessions').deleteMany({lastStatus:{$lt: (Date.now()-TWO_MONTHS)}})
    
}