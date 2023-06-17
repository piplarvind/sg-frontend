import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-estore-date',
  templateUrl: './estore-date.component.html',
  styleUrls: ['./estore-date.component.scss']
})
export class EstoreDateComponent implements OnInit {
  date1: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}
}
