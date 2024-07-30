import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

  public constructor (private title: Title) {} 

  public ngOnInit() {
    this.title.setTitle('CM - Not Found');
  }

}
