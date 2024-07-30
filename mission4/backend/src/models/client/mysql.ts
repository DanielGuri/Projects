import Model from "./model";
import DTO from './dto';
import query from "../../db/mysql";

class Client implements Model {

    public async getAll(): Promise<DTO[]> {
        const clients = await query(`
            SELECT  id,
                    name,
                    title,
                    phone,
                    email
            FROM    clients
        `);
        return clients;  
    }
   
}

const client = new Client();
export default client;