import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpInterceptor } from '@angular/common/http';

import { HttpService } from '@app/core/http/http.service';
import { HttpCacheService } from '@app/core/http/http-cache.service';
import { ErrorHandlerInterceptor } from '@app/core/http/error-handler.interceptor';
import { CacheInterceptor } from '@app/core/http/cache.interceptor';

describe('HttpService', () => {
  let httpCacheService: HttpCacheService;
  let http: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ErrorHandlerInterceptor,
        CacheInterceptor,
        HttpCacheService,
        {
          provide: HttpService, // Use HttpService instead of HttpClient
          useClass: HttpService
        },
      ]
    });
  });

  beforeEach(inject([
    HttpService,
    HttpTestingController,
    HttpCacheService
  ], (_http: HttpService,
      _httpMock: HttpTestingController,
      _httpCacheService: HttpCacheService) => {

    http = _http;
    httpMock = _httpMock;
    httpCacheService = _httpCacheService;
  }));

  afterEach(() => {
    httpMock.verify();
    httpCacheService.cleanCache();
  });

  it('should use error handler and no cache by default', () => {
    // Arrange
    let interceptors: HttpInterceptor[];
    const realRequest = http.request;
    spyOn(http, 'request').and.callFake(function(this: any) {
      interceptors = this.interceptors;
      return realRequest.apply(this, arguments);
    });

    // Act
    const request = http.get('/toto');

    // Assert
    request.subscribe(() => {
      expect(http.request).toHaveBeenCalled();
      expect(interceptors.some(i => i instanceof ErrorHandlerInterceptor)).toBeTruthy();
      expect(interceptors.some(i => i instanceof CacheInterceptor)).toBeFalsy();
    });
    httpMock.expectOne({}).flush({});
  });

  it('should use cache', () => {
    // Arrange
    let interceptors: HttpInterceptor[];
    const realRequest = http.request;
    spyOn(http, 'request').and.callFake(function(this: any) {
      interceptors = this.interceptors;
      return realRequest.apply(this, arguments);
    });

    // Act
    const request = http
      .cache()
      .get('/toto');

    // Assert
    request.subscribe(() => {
      expect(interceptors.some(i => i instanceof ErrorHandlerInterceptor)).toBeTruthy();
      expect(interceptors.some(i => i instanceof CacheInterceptor)).toBeTruthy();
    });
    httpMock.expectOne({}).flush({});
  });

  it('should skip error handler', () => {
    // Arrange
    let interceptors: HttpInterceptor[];
    const realRequest = http.request;
    spyOn(http, 'request').and.callFake(function(this: any) {
      interceptors = this.interceptors;
      return realRequest.apply(this, arguments);
    });

    // Act
    const request = http
      .skipErrorHandler()
      .get('/toto');

    // Assert
    request.subscribe(() => {
      expect(interceptors.some(i => i instanceof ErrorHandlerInterceptor)).toBeFalsy();
      expect(interceptors.some(i => i instanceof CacheInterceptor)).toBeFalsy();
    });
    httpMock.expectOne({}).flush({});
  });
});
