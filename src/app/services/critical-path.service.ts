import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedService} from "./shared.service";
import {Observable} from "rxjs";
import {KeyValue} from "@angular/common";
import {environment} from "../../environments/environment";
import {catchError, finalize, retry} from "rxjs/operators";
import {FlatCriticalPath} from "../shared/models/CPM";

@Injectable({
  providedIn: 'root'
})
export class CriticalPathService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  public getFlattenedNodes(): Observable<FlatCriticalPath> {
    this.sharedService.queueLoading('getFlattenedNodes');
    return this.http.get<FlatCriticalPath>(environment.apiUrl + '/critical-paths/test?flatten=true').pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<FlatCriticalPath>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('getFlattenedNodes');
      })
    );
  }

  private handleError(err: any): void {
    console.log('Error: ' + err)
    this.sharedService.clearLoading();
  }
}
