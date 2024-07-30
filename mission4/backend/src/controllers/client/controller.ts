import { NextFunction, Request, Response } from "express";
import getModel from "../../models/client/factory";

export const getAll =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clients = await getModel().getAll();
        res.json(clients);
    } catch (err) {
        next(err);
    }
}