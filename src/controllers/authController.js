import { createUserSchema, loginUserSchema } from "../schemas.js";
import db from "../db.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';


export async function SignUp(req, res) {

    const user = req.body;
    const { error } = createUserSchema.validate(user);
    if (error) return res.sendStatus(422);

    try {
        const userConflict = await db.collection('users').findOne({ email: user.email });

        if (userConflict) return res.status(409).send("Esse email já está em uso. Tente outro.");

        const passwordHash = bcrypt.hashSync(user.password, 10);

        await db.collection("users").insertOne({ ...user, password: passwordHash, wallet: [] });

        res.status(201).send("OK");

    } catch (err) {

        res.sendStatus(500);
    }
}

export async function SignIn(req, res) {

    const user = req.body;
    const { error } = loginUserSchema.validate(user);
    if (error) return res.sendStatus(422);

    try {
        const userFound = await db.collection('users').findOne({ email: user.email });

        if (userFound && bcrypt.compareSync(user.password, userFound.password)) {
            const token = uuid();
            await db.collection('sessions').insertOne({
                userId: userFound._id,
                token,
                lastStatus: Date.now()
            })
            res.send(token);
        } else {
            res.status(404).send("Usuário não encontrado, senha ou email incorreto");
        }
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
    
}