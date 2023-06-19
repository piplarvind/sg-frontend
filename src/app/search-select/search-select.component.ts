import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import { SharedService } from '@app/shared/shared.service';
import { MatSelect } from '@angular/material/select';
import { take, takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss']
})
export class SearchSelectComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  public bankCtrl: UntypedFormControl = new UntypedFormControl();
  @Input() variable: any;
  @Input() isTeam: Boolean = false;
  @Input() isClub: Boolean = false;
  @Input() isMAIL: Boolean = false;
  @Input() isUser: Boolean = false;
  @Input() isPayment: Boolean = false;
  @Input() isPackage: Boolean = false;
  @Input() isDisabled: Boolean = false;
  @Input() alreadySel: Array<any>;
  @Input() isRes: Boolean = false;
  @Input() isDistrict: Boolean = false;
  @Input() isDefault: Boolean = false;
  @Input() islabel: Boolean = false;
  @Input() isRegion: Boolean = false;
  @Input() placeHolder: any;
  public bankFilterCtrl: UntypedFormControl = new UntypedFormControl();
  public filteredBanks: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @Input() dropdownList: Array<any> = [];
  @Output() valueUpdated: EventEmitter<any> = new EventEmitter();
  private _onDestroy = new Subject<void>();
  @Input() isMultiple: Boolean = false;
  @Input() isRequired: Boolean = false;
  @Output() variableChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('dropSelect') dropSelect: MatSelect;

  constructor(public sharedService: SharedService) {}

  ngOnInit() {
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dropdownList']) {
      if (this.dropdownList !== undefined) {
        this.filteredBanks.next(this.dropdownList);
      }
    }
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private setInitialValue() {
    this.filteredBanks
      .pipe(
        take(1),
        takeUntil(this._onDestroy)
      )
      .subscribe(() => {
        this.dropSelect.compareWith = (a, b) => a && b && a._id === b._id;
      });
  }

  private filterBanks() {
    if (!this.dropdownList) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.dropdownList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    if (this.isRes) {
      this.filteredBanks.next(
        this.dropdownList.filter(
          bank => bank.resource_name.toLowerCase().indexOf(search) > -1
        )
      );
    } else if (this.isUser) {
      this.filteredBanks.next(
        this.dropdownList.filter(
          bank => bank.first_name.toLowerCase().indexOf(search) > -1
        )
      );
    } else if (this.isDistrict) {
      this.filteredBanks.next(
        this.dropdownList.filter(
          bank => bank.district.toLowerCase().indexOf(search) > -1
        )
      );
    } else if (this.isRegion) {
      this.filteredBanks.next(
        this.dropdownList.filter(
          bank => bank.region.toLowerCase().indexOf(search) > -1
        )
      );
    } else if (this.isDefault) {
      this.filteredBanks.next(
        this.dropdownList.filter(
          bank => bank.name.toLowerCase().indexOf(search) > -1
        )
      );
    } else if (this.islabel) {
      this.filteredBanks.next(
        this.dropdownList.filter(
          bank => bank.label.toLowerCase().indexOf(search) > -1
        )
      );
    } else if (this.isClub) {
      this.filteredBanks.next(
        this.dropdownList.filter(
          bank => bank.club_name.toLowerCase().indexOf(search) > -1
        )
      );
    } else {
      this.filteredBanks.next(
        this.dropdownList.filter(
          bank => bank.name.toLowerCase().indexOf(search) > -1
        )
      );
    }
  }

  getResultVal(event: any) {
    this.valueUpdated.emit({
      value: event
    });
  }
}
