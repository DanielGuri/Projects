import express from "express";
import clientsRouter from './routers/clients';
import tasksRouter from './routers/tasks';
import { notFound } from "./middlewares/not-found";
import { errorHandler } from "./middlewares/error-handler";
import cors from 'cors';

const server = express();
server.use(cors());  
server.use(express.json());  

server.use('/api/clients', clientsRouter);  
server.use('/api/tasks', tasksRouter);  

// special middleware for 'not found' error:
server.use(notFound);

// error middlewares:
server.use(errorHandler);

export default server;