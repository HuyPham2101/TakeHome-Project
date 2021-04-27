import {Router} from 'express'
import { createTracking, getallTracking } from '../controller/trackingcontroller';

export const globalRouter = Router({mergeParams: true });

globalRouter.get("/" , async(_req,res) => {
    res.send({ message: "HELLO WORLD"})
})

// Show all trackings
globalRouter.get("/trackings", getallTracking);
//create a tracking
globalRouter.post("/tracking", createTracking);