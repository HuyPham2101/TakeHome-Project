require('dotenv-safe').config()

import express , {Request}from 'express'

const port : number = Number(process.env.PORT)

export const startserver = async () => {
    try{
        const app = express();
        app.get('/api' , async(_req:Request,res) => {
            console.log("halloweolrd")
            res.send({"message" : "Helloworld"});
        })
        const server = app.listen(port , () => console.log(`Server is running on port ${port}`));
        return { server }
    }catch (e) {
        console.log(e)
        throw e;
    }
}

startserver();