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
    this.sharedService.queueLoading('getAllBills');
    return this.http.get<KeyValue<string, string>[]>(environment.apiUrl + '/cocomo/ratings').pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<KeyValue<string, string>[]>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('getAllBills');
      })
    );
  }

  public getRatingNamesByCategory(categoryName: string): Observable<KeyValue<string, string>[]> {
    this.sharedService.queueLoading('getRatingNamesAndCategory');
    return this.http.get<KeyValue<string, string>[]>(environment.apiUrl + '/cocomo/ratings/categories/' + categoryName).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<KeyValue<string, string>[]>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('getRatingNamesAndCategory');
      })
    );
  }

  public calculateCOCOMO(cocomo: CocomoRequest): Observable<CocomoResponse>{
    this.sharedService.queueLoading('calculateCOCOMO');
    return this.http.post<CocomoResponse>(environment.apiUrl + '/cocomo/calculate', cocomo).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<CocomoResponse>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('calculateCOCOMO');
      })
    );
  }

  private handleError(err: any): void {
    console.log('Error: ' + err)
    this.sharedService.clearLoading();
  }
}
