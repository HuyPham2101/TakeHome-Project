import { getRepository } from 'typeorm';
import { Request, Response } from 'express'
import { Tracking } from '../entity/Tracking';

/**Get all Trackings */
export const getallTracking = async(_req: Request,res:Response) => {
    try{
        const trackings = await getRepository(Tracking).find({});
        res.send({
            data:trackings
        })
    }catch(e){
        res.status(404).send({status : 'not Found'});
    }
}
// Create a tracking
export const createTracking = async (req :Request ,res : Response) => {
    let {description, startTime,endTime} = req.body;
    try{
    const tracking = new Tracking();
    tracking.description = description;
    tracking.startTime = startTime;
    tracking.endTime = endTime;
    const createdtrackings = await getRepository(Tracking).save(tracking)
    res.send ({
        data:createdtrackings
    })
    }catch(e){
        res.status(404).send({status : 'not Found'});
    }
}

