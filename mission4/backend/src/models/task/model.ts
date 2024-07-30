import DTO from './dto';

export default interface Model {
    getAll(): Promise<DTO[]>;
    add(task: DTO): Promise<DTO>;
    remove(id: number): Promise<boolean>;
}