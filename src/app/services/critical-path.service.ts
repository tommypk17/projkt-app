import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedService} from "./shared.service";
import {Observable} from "rxjs";
import {KeyValue} from "@angular/common";
import {environment} from "../../environments/environment";
import {catchError, finalize, retry} from "rxjs/operators";
import {CriticalPathNode, FlatCriticalPath} from "../shared/models/CPM";

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

  public getCriticalPath(id: string): Observable<FlatCriticalPath> {
    this.sharedService.queueLoading('getCriticalPath');
    return this.http.get<FlatCriticalPath>(environment.apiUrl + `/critical-paths/mine/${id}?flatten=true`).pipe(
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<FlatCriticalPath>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('getCriticalPath');
      })
    );
  }

  public getSavedCriticalPathNames(): Observable<any> {
    this.sharedService.queueLoading('getSavedCriticalPathNames');
    return this.http.get<any>(environment.apiUrl + '/critical-paths/mine/names').pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<any>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('getSavedCriticalPathNames');
      })
    );
  }

  public addNodeToCriticalPath(node: {name: string, duration: number, previous: string[]}, graphId: string): Observable<any> {
    this.sharedService.queueLoading('addNodeToCriticalPath');
    return this.http.post<any>(environment.apiUrl + `/critical-paths/mine/${graphId}/nodes`, node).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<any>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('addNodeToCriticalPath');
      })
    );
  }

  public removeNodeToCriticalPath(graphId: string, nodeId: string): Observable<any> {
    this.sharedService.queueLoading('removeNodeToCriticalPath');
    return this.http.delete<any>(environment.apiUrl + `/critical-paths/mine/${graphId}/nodes/${nodeId}`).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<any>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('removeNodeToCriticalPath');
      })
    );
  }

  private handleError(err: any): void {
    console.log('Error: ' + err)
    this.sharedService.clearLoading();
  }
}
