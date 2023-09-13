import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, filter, finalize, map, Observable, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if(request.method == 'POST') this.messageService.add({ key: 'global', severity: 'success', summary: 'Success', detail: event.body.message })
          if(request.method == 'PUT') this.messageService.add({ key: 'global', severity: 'success', summary: 'Updated', detail: event.body.message })
          if(request.method == 'DELETE') this.messageService.add({ key: 'global', severity: 'success', summary: 'Deleted', detail: event.body.message })
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.messageService.add({ key: 'global', severity: 'error', summary: 'An error occurred', detail: 'The request failed' });
        return throwError(() => {throw new Error(error.message)})
      })
    );
  }
}

class Response {
  message?: string;
  data: any;
}
