import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

const routes = {
  quote: (c: RandomQuoteContext) => `/jokes/random?category=${c.category}`
};

export interface RandomQuoteContext {
  // The quote's category: 'dev', 'explicit'...
  category: string;
}

@Injectable()
export class QuoteService {
  curclub: any;
  cachedResponse: HttpResponse<any> | null = null;

  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: localStorage.getItem('token')
  // });

  constructor(public http: HttpClient) {}

  getRandomQuote(context: RandomQuoteContext): Observable<string> {
    if (this.cachedResponse) {
      // If there's a cached response, return it as an observable
      return of(this.cachedResponse.body.value);
    } else {
      return this.http
        .get(routes.quote(context), { observe: 'response' })
        .pipe(
          map((response: HttpResponse<any>) => {
            // Cache the response
            this.cachedResponse = response;
            return response.body.value;
          }),
          catchError(() => of('Error, could not load joke :-('))
        );
    }
  }
}
