import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { TaskModel } from '../../../models/task.model';
import { ClientService } from '../../../services/client.service';
import { ClientModel } from '../../../models/client.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ FormsModule, NgIf, NgFor ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {

  public clients?: ClientModel[];

  public constructor (
    private taskService: TaskService,
    private clientService: ClientService,
    private router: Router,
    private title: Title
  ) {}

  public task = new TaskModel;

  public async ngOnInit() {
    this.clients = await this.clientService.getAll();
    this.title.setTitle('CM - Tasks');
  }

  public async submitForm() {
    console.log(this.task);
    const newTask = await this.taskService.add(this.task);
    alert(`added a new task with id ${newTask.id}`);
    this.router.navigateByUrl('/home');
  }

}
