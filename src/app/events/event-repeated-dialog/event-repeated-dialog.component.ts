import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

import { DialogData } from '../model/dialog';
export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-event-repeated-dialog',
  templateUrl: './event-repeated-dialog.component.html',
  styleUrls: ['./event-repeated-dialog.component.scss']
})
export class EventRepeatedDialogComponent implements OnInit {
  selectedValue: string;
  selectedCar: string;

  daysOfTheWeekarray: Food[] = [
    { value: '1', viewValue: 'Sunday' },
    { value: '2', viewValue: 'Monday' },
    { value: '3', viewValue: 'Tuesday' },
    { value: '4', viewValue: 'Wednesday' },
    { value: '5', viewValue: 'Thursday' },
    { value: '6', viewValue: 'Friday' },
    { value: '7', viewValue: 'Saturday' }
  ];
  repeat_type: string;
  day: string;
  dayOfWeek: any = [];
  weekOfMonth: string;
  dayOfMonth = [];
  month: string;
  years: string;
  dayOfMonthArry = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31'
  ];

  initialChips: any[];
  onChipSelected: any = [];

  private chipCollection: Map<Food, boolean> = new Map<Food, boolean>();
  private id: Map<string, boolean> = new Map<string, boolean>();

  montharray: Food[] = [
    {
      value: '*',
      viewValue: 'Every'
    },
    {
      value: '1',
      viewValue: 'January'
    },
    {
      value: '2',
      viewValue: 'February'
    },
    {
      value: '3',
      viewValue: 'March'
    },
    {
      value: '4',
      viewValue: 'April'
    },

    {
      value: '5',
      viewValue: 'May'
    },
    {
      value: '6',
      viewValue: 'June'
    },
    {
      value: '7',
      viewValue: 'July'
    },
    {
      value: '8',
      viewValue: 'August'
    },
    {
      value: '9',
      viewValue: 'September'
    },
    {
      value: '10',
      viewValue: 'October'
    },
    {
      value: '11',
      viewValue: 'November'
    },
    {
      value: '12',
      viewValue: 'December'
    }
  ];

  repeatArray = ['day', 'week', 'month', 'year'];
  weekarray = ['Every', '1', '2', '3', '4', '5'];

  constructor(
    public dialogRef: MatDialogRef<EventRepeatedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    if (this.data.month) {
      this.month = this.data.month.split('-');
    }

    this.day = this.data.day;
    if (this.data.dayOfWeek) {
      let dayweek = this.data.dayOfWeek.split('-');
      for (let i = 0; i < dayweek.length; i++) {
        this.selectChip(dayweek[i]);
      }
    }

    if (this.data.weekOfMonth === '*') {
      this.weekOfMonth = 'Every';
    } else {
      this.weekOfMonth = this.data.weekOfMonth;
    }
    if (this.data.dayOfMonth) {
      let daymonth: any = this.data.dayOfMonth.split('-');

      this.dayOfMonth = this.dayOfMonthArry.filter(function(e) {
        return this.indexOf(e) < 0;
      }, daymonth);
      // for (let i = 0; i < daymonth.length; i++) {
      //   this.dayOfMonth = this.dayOfMonthArry.filter(
      //     item => item === daymonth[i]
      //   );
      //   console.log();
      // }

      this.dayOfMonth = daymonth.slice();
    }
    this.years = this.data.years;
  }
  repeatType(event) {
    this.repeat_type = event;
    // if (event) {
    //   // if (this.repeat_type === 'week') {
    //   //   this.weekOfMonth = 'Every';
    //   // }
    //   // if (this.repeat_type === 'day') {
    //   //   this.day = this.data.day;
    //   // }
    //   // if (this.repeat_type === 'month') {
    //   //   this.month = 'Every';
    //   // }
    // }

    if (this.repeat_type === 'week') {
      for (const chip of this.daysOfTheWeekarray) {
        this.chipCollection.set(chip, false);
      }

      if (this.initialChips) {
        for (const chip of this.initialChips) {
          this.chipCollection.set(chip, true);
        }
      }

      this.onChipSelected = [];
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isSelected(chip: any) {
    return this.chipCollection.get(chip);
  }

  onClick($event: Event, chip: string, i): any {
    $event.preventDefault();
    $event.stopPropagation();
    this.selectChip(chip);
    const selected = this.getSelected();
    // this.id = selected;
    let stringdayofMonth = '';
    for (let i = 0; i < selected.length; i++) {
      if (i < selected.length - 1) {
        stringdayofMonth = selected[i] + '-' + stringdayofMonth;
      } else if (i === selected.length - 1) {
        stringdayofMonth = stringdayofMonth + selected[i];
      }
    }

    // this.data.dayOfMonth = stringdayofMonth;
    this.data.dayOfWeek = stringdayofMonth;
    // // console.log('thisdfhjdhg', this.onChipSelected);
  }

  selectChip(chip: any) {
    if (this.chipCollection.get(chip)) {
      this.chipCollection.set(chip, false);
    } else {
      this.chipCollection.set(chip, true);
    }
    // if (this.id.get(i)) {
    //   this.id.set(i, false);
    // } else {
    //   this.id.set(i, true);
    // }
  }

  getSelected() {
    const selected = <any[]>[];

    Array.from(this.chipCollection.entries(), (v: [any, boolean]) => {
      if (v['1']) {
        selected.push(v['0']);
      }
    });
    return selected;
  }
  monthday(event) {
    let stringdayofMonth = '';

    for (let i = 0; i < event.length; i++) {
      if (i < event.length - 1) {
        stringdayofMonth = event[i] + '-' + stringdayofMonth;
      } else if (i === event.length - 1) {
        stringdayofMonth = stringdayofMonth + event[i];
      }
    }

    this.data.dayOfMonth = stringdayofMonth;
  }

  selectday(event) {
    this.data.day = this.day;
  }
  selectweefonMonth(event) {
    if (this.weekOfMonth === 'Every') {
      this.data.weekOfMonth = '*';
    } else {
      this.data.weekOfMonth = this.weekOfMonth;
    }
  }

  selectdayOfMonth(event) {}
  selectYear(evnt) {
    this.data.years = this.years;
  }
}
