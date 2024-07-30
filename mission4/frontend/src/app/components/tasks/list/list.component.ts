import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { TaskModel } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ FormsModule, NgFor, NgIf, DatePipe ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public tasks?: TaskModel[];

  public constructor (
    private taskService: TaskService,
  ) {}

  public async ngOnInit() {
    this.tasks = await this.taskService.getAll();
  }

  public async deleteTask(id: number) {
    try {
      await this.taskService.remove(id);
      this.tasks = await this.taskService.getAll();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

}
