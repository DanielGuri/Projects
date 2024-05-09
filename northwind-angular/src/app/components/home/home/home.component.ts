import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ NgIf, SearchComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
    public img = Math.floor(Math.random() * 2) + 1;

    public weekendDiscount = 20;
    public weekdayDiscount = 10;

    public isWeekend(): boolean {
        const today = new Date();
        return today.getDay() >= 6;
    }

    public ngOnInit() {
        this.title.setTitle('NW Home');
        // console.log('component intialized');
    }

    public ngOnDestroy() {
        console.log('component destroyed');
    }

    // public title: Title;
    // public constructor (title: Title) {
    //     this.title = title;
    // }

    public constructor (private title: Title) {}

}
