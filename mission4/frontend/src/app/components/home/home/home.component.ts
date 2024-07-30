import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../../tasks/list/list.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ ListComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  public constructor (private title: Title) {} 

  public ngOnInit() {
    this.title.setTitle('CM - Home');
  }

}
