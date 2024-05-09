import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

    public generateRandomNumber(): number {
        return Math.floor(Math.random() * 100) + 1; // random number 0-100
    }

    public generateSeries(length: number): number[] {
        const arr: number[] = [];
        for (let i = 0; i < length; i++) {
            arr.push(this.generateRandomNumber());
        }
        return arr;
    }

    public generateRandomNumberWithDelay(delay: number): Promise<number> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.generateRandomNumber())
            }, delay);
        })        
    }

    public generateRandomNumberSeriesWithDelay(delay: number): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            setInterval(() => { // <= won't work!!! a promise can br resolved only once
                resolve(this.generateRandomNumber())
            }, delay);
        })        
    }

    public generate(limit: number): Observable<number> {
        return new Observable((observer: Observer<number>) => {
            setInterval(() => {
                try {
                    const num = this.generateRandomNumber();
                    // if ( num < 2) throw new Error(`too small of a number: ${num}`);
                    observer.next(this.generateRandomNumber())

                    limit--;

                    if (limit === 0) {
                        observer.complete()
                    }
                } catch (err) {
                    observer.error(err);
                }
            }, 1000)
        })
    }


  constructor() { }
}
