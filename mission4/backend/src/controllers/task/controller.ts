import { NextFunction, Request, Response } from "express";
import getModel from "../../models/task/factory";
import { StatusCodes } from "http-status-codes";

export const getAll =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await getModel().getAll();
        res.json(tasks);
    } catch (err) {
        next(err);
    }
}

export const add =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await getModel().add(req.body);
        res.status(StatusCodes.CREATED).json(task);
    } catch (err) {
        next(err);
    }
}

export const remove =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isDeleted = await getModel().remove(+req.params.id);
        if (isDeleted) return res.status(StatusCodes.NO_CONTENT).send('');
        res.status(StatusCodes.NOT_FOUND).send('');
    } catch (err) {
        next(err);
    }
}