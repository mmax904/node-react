import { validationResult } from 'express-validator';

export const validationResults = (req,res,next) => {
    try {
        validationResult(req).throw();
        next();
    } catch (err) {
        next({status:400,errors:err.mapped()})
    }
}
