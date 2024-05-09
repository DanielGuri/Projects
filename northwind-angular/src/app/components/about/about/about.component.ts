import { Observable, filter, map, takeWhile, takeLast } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GeneratorService } from '../../../services/generator.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ NgFor ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit{

    public arr: number[] = [];

    public start(): void {
        const observable = this.generator.generate(20);

        // deprecated method, can still be used
        // observable.subscribe(
        //     num => this.arr.push(num),
        //     console.log,
        //     () => this.title.setTitle('Done')
        // );

        // but better use this new method (with an object containing named functions):
        // simple usage
        // observable.subscribe({
        //     next: (num) => {this.arr.push(num)},
        //     error: (err) => console.log(`error in observer: ${err}`),
        //     complete: () => this.title.setTitle('Done')
        // })

        // filter data stream
        // observable.pipe(filter(n => n % 2 === 0)).subscribe({
        //     next: (num) => {this.arr.push(num)},
        //     error: (err) => console.log(`error in observer: ${err}`),
        //     complete: () => this.title.setTitle('Done')
        // })

        // map each value according to need
        // observable.pipe(map(n => n**2)).subscribe({
        //     next: (num) => {this.arr.push(num)},
        //     error: (err) => console.log(`error in observer: ${err}`),
        //     complete: () => this.title.setTitle('Done')
        // })

        // like filter, but it stops listening when the 1st filtered value enters
        // observable.pipe(takeWhile(n => n < 90)).subscribe({
        //     next: (num) => {this.arr.push(num)},
        //     error: (err) => console.log(`error in observer: ${err}`),
        //     complete: () => this.title.setTitle('Done')
        // })

        observable.pipe(takeLast(5)).subscribe({
            next: (num) => {this.arr.push(num)},
            error: (err) => console.log(`error in observer: ${err}`),
            complete: () => this.title.setTitle('Done')
        })

    }

    public async ngOnInit() {
        this.title.setTitle('NW About');
        // console.log('component intialized');
        // console.log(`random number: ${this.generator.generateRandomNumber()}`)
        // console.log(`a series of randoms ${this.generator.generateSeries(10)}`)
        // const asyncRandom = await this.generator.generateRandomNumberWithDelay(1000);
        // console.log(`random async is ${asyncRandom}`)
        // const asyncRandomSeries = await this.generator.generateRandomNumberSeriesWithDelay(1000);
        // console.log(`random async series is ${asyncRandomSeries}`)
    }

    public constructor (
        private title: Title,
        private generator: GeneratorService
    ) {}

}
