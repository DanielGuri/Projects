import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
    public tooltip = "tooltip from TS"
    public query?: string;

    public search() {
        alert(`searching for ${this.query}`)
    }

    ngOnInit(): void {
        this.query = 'search for anything'
    }
}
