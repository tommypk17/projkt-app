import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  loading: Subject<boolean> = new Subject<boolean>();
  loadingQueue: string[] = [];

  constructor() { }

  queueLoading(section: string): void {
    let foundIdx = this.loadingQueue.findIndex(x => x == section);
    if(foundIdx < 0){
      this.loadingQueue.push(section);
    }
    if(this.loadingQueue.length > 0){
      this.loading.next(true);
    }
  }

  dequeueLoading(section: string): void {
    let foundIdx = this.loadingQueue.findIndex(x => x == section);
    if(foundIdx >= 0) {
      this.loadingQueue.splice(foundIdx, 1);
    }
    if(this.loadingQueue.length <= 0){
      this.loading.next(false);
    }
  }

  clearLoading(): void {
    this.loadingQueue = [];
    this.loading.next(false);
  }
}
