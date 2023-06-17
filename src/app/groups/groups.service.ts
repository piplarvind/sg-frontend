import { Injectable, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { TestBed } from '@angular/core/testing';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class GroupsService {
  constructor() {}

  $isLoggedIn = new EventEmitter();

  public test = new Subject();
  public test$ = this.test.asObservable();
  public technique = new Subject();
}
