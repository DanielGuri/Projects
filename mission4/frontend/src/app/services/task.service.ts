import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task.model';
import { environment } from '../../environments/environment.development';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  public async getAll(): Promise<TaskModel[]> {
    const observable = this.httpClient.get<TaskModel[]>(environment.tasksUrl);
    const tasks = await firstValueFrom(observable);
    return tasks;
  }

  public async add(task: TaskModel): Promise<TaskModel> {
    const observable = this.httpClient.post<TaskModel>(environment.tasksUrl, task);
    const newTask = await firstValueFrom(observable);
    return newTask;
  }

  public async remove(id: number): Promise<void> {
    await firstValueFrom(this.httpClient.delete<void>(`${environment.tasksUrl}/${id}`));
  }

}
