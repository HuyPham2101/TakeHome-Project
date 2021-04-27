require('dotenv-safe').config()
//  import { getRepository } from 'typeorm';
import express from 'express'
import { globalRouter } from './router/global.router';
import { createDatabaseConnection } from './util/createDatabaseConnection';
// import { Tracking } from './entity/Tracking';
import bodyParser from 'body-parser';

const port : number = Number(process.env.PORT)

export const startserver = async () => {
    try{
        const app = express();
        const dbConnection = await createDatabaseConnection();

        app.use(bodyParser.urlencoded());
        app.use(bodyParser.json())

        app.use("/" ,globalRouter)
        const server = app.listen(port , () => console.log(`Server is running on port ${port}`));
        return { server, dbConnection}
    }catch (e) {
        console.log(e)
        throw e;
    }
}

startserver();