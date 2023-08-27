import { Injectable } from '@angular/core';
import {SharedService} from "./shared.service";
import {Observable} from "rxjs";
import {catchError, finalize, retry} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {KeyValue} from "@angular/common";
import {CocomoRequest, CocomoResponse} from "../shared/models/COCOMO";

@Injectable({
  providedIn: 'any'
})
export class CocomoService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  public getRatingNames(): Observable<KeyValue<string, string>[]> {
    return this.http.get<KeyValue<string, string>[]>(environment.apiUrl + '/cocomo/ratings').pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<KeyValue<string, string>[]>((subscriber) => {
          subscriber.next(undefined);
        })
      })
    );
  }

  public getRatingNamesByCategory(categoryName: string): Observable<KeyValue<string, string>[]> {
    return this.http.get<KeyValue<string, string>[]>(environment.apiUrl + '/cocomo/ratings/categories/' + categoryName).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<KeyValue<string, string>[]>((subscriber) => {
          subscriber.next(undefined);
        })
      })
    );
  }

  public calculateCOCOMO(cocomo: CocomoRequest): Observable<CocomoResponse>{
    return this.http.post<CocomoResponse>(environment.apiUrl + '/cocomo/calculate', cocomo).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<CocomoResponse>((subscriber) => {
          subscriber.next(undefined);
        })
      })
    );
  }

  public saveCOCOMO(nameToSave: string, cocomo: CocomoRequest): Observable<boolean>{
    let toSave: any = {
      name: nameToSave,
      cocomo: cocomo
    };
    return this.http.post<boolean>(environment.apiUrl + '/cocomo/save', toSave).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<boolean>((subscriber) => {
          subscriber.next(undefined);
        })
      })
    );
  }

  public getSavedCOCOMOs(): Observable<CocomoRequest[]> {
    return this.http.get<CocomoRequest[]>(environment.apiUrl + '/cocomo/mine').pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<CocomoRequest[]>((subscriber) => {
          subscriber.next(undefined);
        })
      })
    );
  }

  public getSavedCOCOMOById(id: string): Observable<CocomoRequest> {
    return this.http.get<CocomoRequest>(environment.apiUrl + `/cocomo/mine/${id}`).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<CocomoRequest>((subscriber) => {
          subscriber.next(undefined);
        })
      })
    );
  }

  public getSavedCOCOMONames(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/cocomo/mine/names').pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<any>((subscriber) => {
          subscriber.next(undefined);
        })
      })
    );
  }

  public hasSavedCOCOMOs(): Observable<boolean> {
    return this.http.get<boolean>(environment.apiUrl + '/cocomo/mine/exists').pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<boolean>((subscriber) => {
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
