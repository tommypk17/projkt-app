import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedService} from "./shared.service";
import {map, Observable} from "rxjs";
import {KeyValue} from "@angular/common";
import {environment} from "../../environments/environment";
import {catchError, finalize, retry} from "rxjs/operators";
import {CriticalPathEdge, CriticalPathNode, FlatCriticalPath} from "../shared/models/CPM";

@Injectable({
  providedIn: 'root'
})
export class CriticalPathService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  public getFlattenedNodes(): Observable<FlatCriticalPath> {
    return this.http.get<any>(environment.apiUrl + '/critical-paths/test?flatten=true').pipe(
      map(x => x.data),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<FlatCriticalPath>((subscriber) => {
          subscriber.next(undefined);
        })
      })
    );
  }

  public getCriticalPath(id: string): Observable<FlatCriticalPath> {
    return this.http.get<any>(environment.apiUrl + `/critical-paths/mine/${id}?flatten=true`).pipe(
      map(x => x.data),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<FlatCriticalPath>((subscriber) => {
          subscriber.next(undefined);
        })
      })
    );
  }

  public createCriticalPath(criticalPath: {name: string}): Observable<any> {
    return this.http.post<any>(environment.apiUrl + `/critical-paths/mine`, criticalPath).pipe(
      map(x => x.data),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<any>((subscriber) => {
          subscriber.next(undefined);
        })
      })
    );
  }

  public getSavedCriticalPathNames(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/critical-paths/mine/names').pipe(
      map(x => x.data),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<any>((subscriber) => {
          subscriber.next(undefined);
        })
      })
    );
  }

  public addNodeToCriticalPath(node: {name: string, duration: number, previous: string[]}, graphId: string): Observable<any> {
    return this.http.post<any>(environment.apiUrl + `/critical-paths/mine/${graphId}/nodes`, node).pipe(
      map(x => x.data),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<any>((subscriber) => {
          subscriber.next(undefined);
        })
      })
    );
  }

  public updateNodeForCriticalPath(node: {id: string, name: string, duration: number}, graphId: string): Observable<any> {
    return this.http.put<any>(environment.apiUrl + `/critical-paths/mine/${graphId}/nodes`, node).pipe(
      map(x => x.data),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<any>((subscriber) => {
          subscriber.next(undefined);
        })
      })
    );
  }

  public removeNodeToCriticalPath(graphId: string, nodeId: string): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + `/critical-paths/mine/${graphId}/nodes/${nodeId}`).pipe(
      map(x => x.data),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<any>((subscriber) => {
          subscriber.next(undefined);
        })
      })
    );
  }

  public addEdgeToCriticalPath(graphId: string, edge: CriticalPathEdge): Observable<any> {
    return this.http.post<any>(environment.apiUrl + `/critical-paths/mine/${graphId}/edges/`, edge).pipe(
      map(x => x.data),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<any>((subscriber) => {
          subscriber.next(undefined);
        })
      })
    );
  }

  public removeEdgeFromCriticalPath(graphId: string, edge: CriticalPathEdge): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + `/critical-paths/mine/${graphId}/edges/${edge.from}/${edge.to}`).pipe(
      map(x => x.data),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<any>((subscriber) => {
          subscriber.next(undefined);
        })
      })
    );
  }

  private handleError(err: any): void {
    console.log('Error: ' + err)
    this.sharedService.clearLoading();
  }
}
