import Model from "./model";
import DTO from './dto';
import { OkPacketParams } from "mysql2";
import query from "../../db/mysql";

class Task implements Model {

    public async getAll(): Promise<DTO[]> {
        const tasks = await query(`
            SELECT      t.id,
                        t.description,
                        t.date,
                        t.clientId,
                        t.completed,
                        c.name AS clientName
            FROM        tasks AS t
            JOIN        clients AS c ON c.id = t.clientId
            ORDER BY    date ASC
        `);
        return tasks;  
    }

    public async getOne(id: number): Promise<DTO> {
        const task = (await query(`
            SELECT  id,
                    description,
                    date,
                    clientId,
                    completed
            FROM    tasks
            WHERE   id = ?
        `, [id]))[0];
        return task;  
    }

    public async add(task: DTO): Promise<DTO> {
        const {
            description,
            date,
            clientId,
            completed
        } = task;
        const result: OkPacketParams = await query(`
            INSERT INTO tasks
            (description, date, clientId, completed)
            VALUES (?,?,?,?)
        `, [description, date, clientId, completed]);
        return this.getOne(result.insertId);
    }

    public async remove(id: number): Promise<boolean> {
        const result: OkPacketParams = await query(`
            DELETE FROM tasks
            WHERE       id = ?
        `, [id]);
        return result.affectedRows > 0;
    }
   
}

const task = new Task();
export default task;